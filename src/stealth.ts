/**
 * Browser Stealth Module
 *
 * Makes automated browsers indistinguishable from normal human-operated browsers.
 * Patches all known automation detection vectors used by anti-bot services
 * (Cloudflare, DataDome, PerimeterX, Akamai, reCAPTCHA, etc.).
 *
 * Controlled via:
 *   - Environment variable: AGENT_BROWSER_STEALTH=true (default: true)
 *   - Launch option: stealth: true/false
 *   - CLI flag: --stealth / --no-stealth
 */

import type { BrowserContext } from 'playwright-core';

// ─────────────────────────────────────────────────────────────────────────────
// Chromium Args — remove automation signals at the browser level
// ─────────────────────────────────────────────────────────────────────────────

export const STEALTH_CHROMIUM_ARGS: string[] = [
  // Core: remove "Chrome is being controlled by automated test software" bar
  '--disable-blink-features=AutomationControlled',

  // Disable info bars / automation warnings
  '--disable-infobars',
  '--disable-notifications',

  // Disable background services that leak automation signals
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-component-extensions-with-background-pages',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-popup-blocking',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-sync',

  // Prevent detection via client hints
  '--disable-features=AutofillServerCommunication',

  // Shared memory — prevents crashes in Docker
  '--disable-dev-shm-usage',

  // GPU flags for headless stability
  '--no-first-run',
  '--no-default-browser-check',
  '--no-service-autorun',

  // Disable webdriver-related features
  '--disable-features=Translate,AcceptCHFrame,MediaRouter,OptimizationHints,ProcessPerSiteUpToMainFrameThreshold',
];

// ─────────────────────────────────────────────────────────────────────────────
// Realistic User-Agent strings — rotate to avoid fingerprinting via fixed UA
// ─────────────────────────────────────────────────────────────────────────────

const REALISTIC_USER_AGENTS = {
  linux: {
    x64: [
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    ],
    arm64: [
      'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    ],
  },
  darwin: {
    arm64: [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    ],
    x64: [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    ],
  },
  win32: {
    x64: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    ],
  },
};

/**
 * Pick a realistic user-agent for the current platform.
 * Never includes "HeadlessChrome" substring.
 */
export function getRealisticUserAgent(): string {
  const os = process.platform as keyof typeof REALISTIC_USER_AGENTS;
  const arch = process.arch === 'arm64' ? 'arm64' : 'x64';
  const platformAgents = REALISTIC_USER_AGENTS[os] as Record<string, string[]> | undefined;
  const agents = platformAgents?.[arch] ?? REALISTIC_USER_AGENTS.linux.x64;
  return agents[Math.floor(Math.random() * agents.length)]!;
}

/**
 * Pick a realistic user-agent AND matching Client Hints metadata.
 * Ensures the UA string and Sec-CH-UA headers are consistent.
 * Call once per session and reuse both values.
 */
export function getRealisticUserAgentWithMetadata(): {
  userAgent: string
  metadata: {
    brands: Array<{ brand: string; version: string }>
    fullVersionList: Array<{ brand: string; version: string }>
    fullVersion: string
    platform: string
    platformVersion: string
    architecture: string
    model: string
    mobile: boolean
    bitness: string
    wow64: boolean
  }
} {
  const ua = getRealisticUserAgent()
  const versionMatch = ua.match(/Chrome\/(\d+)/)
  const majorVersion = versionMatch?.[1] ?? '136'
  const fullVersion = `${majorVersion}.0.0.0`

  let platform = 'Linux'
  let platformVersion = '6.1.0'
  let architecture = 'x86'

  if (ua.includes('Macintosh')) {
    platform = 'macOS'
    platformVersion = '15.0.0'
    architecture = process.arch === 'arm64' ? 'arm' : 'x86'
  } else if (ua.includes('Windows')) {
    platform = 'Windows'
    platformVersion = '15.0.0'
    architecture = 'x86'
  }

  return {
    userAgent: ua,
    metadata: {
      brands: [
        { brand: 'Chromium', version: majorVersion },
        { brand: 'Google Chrome', version: majorVersion },
        { brand: 'Not.A/Brand', version: '99' },
      ],
      fullVersionList: [
        { brand: 'Chromium', version: fullVersion },
        { brand: 'Google Chrome', version: fullVersion },
        { brand: 'Not.A/Brand', version: '99.0.0.0' },
      ],
      fullVersion,
      platform,
      platformVersion,
      architecture,
      model: '',
      mobile: false,
      bitness: '64',
      wow64: false,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Init Script — injected into every page before any site JS runs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Comprehensive stealth patches injected via addInitScript.
 * Covers all major detection vectors used by anti-bot services.
 */
export const STEALTH_INIT_SCRIPT = `
// ═══════════════════════════════════════════════════════════════════════════
// 1. navigator.webdriver — THE primary automation detection signal
// ═══════════════════════════════════════════════════════════════════════════
Object.defineProperty(navigator, 'webdriver', {
  get: () => undefined,
  configurable: true,
});

// ═══════════════════════════════════════════════════════════════════════════
// 2. Chrome runtime — real Chrome has window.chrome with specific structure
// ═══════════════════════════════════════════════════════════════════════════
if (!window.chrome) {
  Object.defineProperty(window, 'chrome', {
    value: {},
    writable: true,
    configurable: true,
  });
}
if (!window.chrome.runtime) {
  Object.defineProperty(window.chrome, 'runtime', {
    value: {
      // PNaCl checker: sites test chrome.runtime.PNaClEnabled
      PNaClEnabled: false,
      // onConnect is expected to exist
      onConnect: undefined,
      // sendMessage exists but throws (real Chrome behavior)
      sendMessage: function() {
        throw new Error('Could not establish connection. Receiving end does not exist.');
      },
      // connect exists but returns undefined (real Chrome behavior)
      connect: function() { return undefined; },
      id: undefined,
    },
    writable: true,
    configurable: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. Permissions API — comprehensive permission state spoofing
// ═══════════════════════════════════════════════════════════════════════════
// Anti-bot scripts query multiple permission types; headless Chrome returns
// different states than real Chrome for several of them.
const originalQuery = window.navigator.permissions?.query?.bind(window.navigator.permissions);
if (originalQuery) {
  const _permDefaults = {
    'notifications': () => Notification.permission || 'default',
    'clipboard-read': () => 'prompt',
    'clipboard-write': () => 'granted',
    'camera': () => 'prompt',
    'microphone': () => 'prompt',
    'geolocation': () => 'prompt',
    'persistent-storage': () => 'prompt',
    'midi': () => 'prompt',
    'background-sync': () => 'granted',
    'accelerometer': () => 'granted',
    'gyroscope': () => 'granted',
    'magnetometer': () => 'granted',
    'payment-handler': () => 'prompt',
    'idle-detection': () => 'prompt',
  };
  Object.defineProperty(window.navigator.permissions, 'query', {
    value: function(parameters) {
      const name = parameters.name;
      if (name in _permDefaults) {
        return Promise.resolve({ state: _permDefaults[name](), onchange: null });
      }
      return originalQuery(parameters).catch(() =>
        Promise.resolve({ state: 'prompt', onchange: null })
      );
    },
    writable: true,
    configurable: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. navigator.plugins — empty in automation, populated in real browser
// ═══════════════════════════════════════════════════════════════════════════
Object.defineProperty(navigator, 'plugins', {
  get: () => {
    const plugins = [
      { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format', length: 1 },
      { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '', length: 1 },
      { name: 'Native Client', filename: 'internal-nacl-plugin', description: '', length: 2 },
    ];
    // Make it look like a real PluginArray
    plugins.item = (i) => plugins[i] || null;
    plugins.namedItem = (name) => plugins.find(p => p.name === name) || null;
    plugins.refresh = () => {};
    return plugins;
  },
  configurable: true,
});

// ═══════════════════════════════════════════════════════════════════════════
// 5. navigator.mimeTypes — matches plugins above
// ═══════════════════════════════════════════════════════════════════════════
Object.defineProperty(navigator, 'mimeTypes', {
  get: () => {
    const mimes = [
      { type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format', enabledPlugin: { name: 'Chrome PDF Plugin' } },
      { type: 'application/x-google-chrome-pdf', suffixes: 'pdf', description: 'Portable Document Format', enabledPlugin: { name: 'Chrome PDF Viewer' } },
    ];
    mimes.item = (i) => mimes[i] || null;
    mimes.namedItem = (name) => mimes.find(m => m.type === name) || null;
    return mimes;
  },
  configurable: true,
});

// ═══════════════════════════════════════════════════════════════════════════
// 6. navigator.languages — empty in some headless configs
// ═══════════════════════════════════════════════════════════════════════════
Object.defineProperty(navigator, 'languages', {
  get: () => ['en-US', 'en'],
  configurable: true,
});

Object.defineProperty(navigator, 'language', {
  get: () => 'en-US',
  configurable: true,
});

// ═══════════════════════════════════════════════════════════════════════════
// 7. navigator.hardwareConcurrency — some headless envs report 0 or 1
// ═══════════════════════════════════════════════════════════════════════════
if (navigator.hardwareConcurrency < 2) {
  Object.defineProperty(navigator, 'hardwareConcurrency', {
    get: () => 4,
    configurable: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 8. navigator.deviceMemory — some headless envs don't report this
// ═══════════════════════════════════════════════════════════════════════════
if (!navigator.deviceMemory) {
  Object.defineProperty(navigator, 'deviceMemory', {
    get: () => 8,
    configurable: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 9. WebGL Renderer — platform-aware GPU spoofing
// ═══════════════════════════════════════════════════════════════════════════
// Pick GPU matching the reported platform to avoid obvious mismatches
// (e.g., NVIDIA GTX 1080 on macOS where NVIDIA hasn't shipped since 2019)
const _plat = (navigator.platform || '').toLowerCase();
let _glVendor, _glRenderer;
if (_plat.includes('mac')) {
  _glVendor = 'Apple';
  const _macGpus = [
    'ANGLE (Apple, ANGLE Metal Renderer: Apple M1 Pro, Unspecified Version)',
    'ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)',
    'ANGLE (Apple, ANGLE Metal Renderer: Apple M3 Pro, Unspecified Version)',
  ];
  _glRenderer = _macGpus[Math.floor(Math.random() * _macGpus.length)];
} else if (_plat.includes('win')) {
  const _winGpus = [
    { v: 'Google Inc. (NVIDIA)', r: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)' },
    { v: 'Google Inc. (NVIDIA)', r: 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER Direct3D11 vs_5_0 ps_5_0, D3D11)' },
    { v: 'Google Inc. (AMD)', r: 'ANGLE (AMD, AMD Radeon RX 580 Direct3D11 vs_5_0 ps_5_0, D3D11)' },
    { v: 'Google Inc. (Intel)', r: 'ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11)' },
  ];
  const _wg = _winGpus[Math.floor(Math.random() * _winGpus.length)];
  _glVendor = _wg.v;
  _glRenderer = _wg.r;
} else {
  // Linux
  const _linuxGpus = [
    { v: 'Google Inc. (NVIDIA)', r: 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1080, OpenGL 4.5)' },
    { v: 'Google Inc. (Intel)', r: 'ANGLE (Intel, Mesa Intel(R) UHD Graphics 630, OpenGL 4.6)' },
    { v: 'Google Inc. (AMD)', r: 'ANGLE (AMD, AMD Radeon RX 570, OpenGL 4.6)' },
  ];
  const _lg = _linuxGpus[Math.floor(Math.random() * _linuxGpus.length)];
  _glVendor = _lg.v;
  _glRenderer = _lg.r;
}
const getParameterOrig = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function(parameter) {
  if (parameter === 37445) return _glVendor;
  if (parameter === 37446) return _glRenderer;
  return getParameterOrig.call(this, parameter);
};
if (typeof WebGL2RenderingContext !== 'undefined') {
  const getParameter2Orig = WebGL2RenderingContext.prototype.getParameter;
  WebGL2RenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) return _glVendor;
    if (parameter === 37446) return _glRenderer;
    return getParameter2Orig.call(this, parameter);
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 10. window.outerWidth / outerHeight — 0 in headless, should match inner
// ═══════════════════════════════════════════════════════════════════════════
if (window.outerWidth === 0) {
  Object.defineProperty(window, 'outerWidth', {
    get: () => window.innerWidth,
    configurable: true,
  });
}
if (window.outerHeight === 0) {
  Object.defineProperty(window, 'outerHeight', {
    get: () => window.innerHeight + 85, // Account for browser chrome
    configurable: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 11. Connection type — headless often has missing/different networkInfo
// ═══════════════════════════════════════════════════════════════════════════
if (navigator.connection && navigator.connection.rtt === 0) {
  Object.defineProperty(navigator.connection, 'rtt', {
    get: () => 50,
    configurable: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 12. Prevent iframe contentWindow detection of automation
// ═══════════════════════════════════════════════════════════════════════════
const origAttachShadow = Element.prototype.attachShadow;
if (origAttachShadow) {
  Element.prototype.attachShadow = function(init) {
    return origAttachShadow.call(this, { ...init });
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 13. Prevent toString() detection of patched functions
// ═══════════════════════════════════════════════════════════════════════════
const nativeToString = Function.prototype.toString;
const overrides = new Map();

function patchToString(target, original) {
  overrides.set(target, nativeToString.call(original || target));
}

const originalToString = Function.prototype.toString;
Function.prototype.toString = function() {
  if (overrides.has(this)) return overrides.get(this);
  return originalToString.call(this);
};
patchToString(Function.prototype.toString, originalToString);

// ═══════════════════════════════════════════════════════════════════════════
// 14. Screen properties — headless may have unrealistic screen values
// ═══════════════════════════════════════════════════════════════════════════
if (screen.colorDepth < 24) {
  Object.defineProperty(screen, 'colorDepth', { get: () => 24, configurable: true });
}
if (screen.pixelDepth < 24) {
  Object.defineProperty(screen, 'pixelDepth', { get: () => 24, configurable: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// 15. Canvas Fingerprint Noise — prevent unique canvas fingerprint matching
// ═══════════════════════════════════════════════════════════════════════════
// Anti-bot systems call toDataURL()/getImageData() on a test canvas to
// generate a browser fingerprint hash. Headless Chrome renders differently
// from real browsers. Adding subtle noise changes the hash per session
// without being visually perceptible.
(function() {
  // Session-stable seed so the same canvas content produces the same
  // fingerprint within a session (avoids randomization detection)
  const _seed = Math.floor(Math.random() * 0xFFFFFF);
  function _noise(data, len) {
    for (var i = 0; i < 10; i++) {
      var idx = ((_seed + i * 7) % (len / 4)) * 4;
      data[idx] = data[idx] ^ 1; // flip LSB — invisible to eye
    }
  }

  // toDataURL — clone canvas, add noise, return clone's data URL
  var origToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function(type, quality) {
    try {
      if (this.width > 0 && this.height > 0 && this.width < 2000 && this.height < 2000) {
        var clone = document.createElement('canvas');
        clone.width = this.width;
        clone.height = this.height;
        var ctx = clone.getContext('2d');
        if (ctx) {
          ctx.drawImage(this, 0, 0);
          var imgData = ctx.getImageData(0, 0, clone.width, clone.height);
          _noise(imgData.data, imgData.data.length);
          ctx.putImageData(imgData, 0, 0);
          return origToDataURL.call(clone, type, quality);
        }
      }
    } catch(e) {}
    return origToDataURL.call(this, type, quality);
  };
  patchToString(HTMLCanvasElement.prototype.toDataURL, origToDataURL);

  // getImageData — add noise to returned pixel data
  var origGetImageData = CanvasRenderingContext2D.prototype.getImageData;
  CanvasRenderingContext2D.prototype.getImageData = function() {
    var imgData = origGetImageData.apply(this, arguments);
    try { _noise(imgData.data, imgData.data.length); } catch(e) {}
    return imgData;
  };
  patchToString(CanvasRenderingContext2D.prototype.getImageData, origGetImageData);

  // toBlob — same treatment as toDataURL
  var origToBlob = HTMLCanvasElement.prototype.toBlob;
  HTMLCanvasElement.prototype.toBlob = function(callback, type, quality) {
    try {
      if (this.width > 0 && this.height > 0 && this.width < 2000 && this.height < 2000) {
        var clone = document.createElement('canvas');
        clone.width = this.width;
        clone.height = this.height;
        var ctx = clone.getContext('2d');
        if (ctx) {
          ctx.drawImage(this, 0, 0);
          var imgData = ctx.getImageData(0, 0, clone.width, clone.height);
          _noise(imgData.data, imgData.data.length);
          ctx.putImageData(imgData, 0, 0);
          return origToBlob.call(clone, callback, type, quality);
        }
      }
    } catch(e) {}
    return origToBlob.call(this, callback, type, quality);
  };
  patchToString(HTMLCanvasElement.prototype.toBlob, origToBlob);
})();

// ═══════════════════════════════════════════════════════════════════════════
// 16. AudioContext Fingerprint Noise — prevent audio fingerprint matching
// ═══════════════════════════════════════════════════════════════════════════
// OfflineAudioContext fingerprinting renders an oscillator and hashes the
// output buffer. Adding tiny noise to getChannelData() changes the hash.
(function() {
  if (typeof AudioBuffer === 'undefined') return;
  var origGetChannelData = AudioBuffer.prototype.getChannelData;
  var _audioNoiseSeed = Math.random() * 0.0001;
  AudioBuffer.prototype.getChannelData = function(channel) {
    var data = origGetChannelData.call(this, channel);
    // Only noise short buffers (fingerprinting uses ~4096-8192 samples)
    if (data.length < 20000) {
      for (var i = 0; i < data.length; i += 100) {
        data[i] = data[i] + _audioNoiseSeed * (i % 2 === 0 ? 1 : -1);
      }
    }
    return data;
  };
  patchToString(AudioBuffer.prototype.getChannelData, origGetChannelData);
})();

// ═══════════════════════════════════════════════════════════════════════════
// 17. navigator.userAgentData — Client Hints JS API matching UA string
// ═══════════════════════════════════════════════════════════════════════════
// When the UA string says Chrome/136 but navigator.userAgentData returns
// different brands/version, anti-bot detects the mismatch. This patches
// the JS-side Client Hints API to match our spoofed UA string.
(function() {
  var _ua = navigator.userAgent || '';
  var _verMatch = _ua.match(/Chrome\\/([\\d]+)/);
  var _majorVer = _verMatch ? _verMatch[1] : '136';
  var _fullVer = _majorVer + '.0.0.0';

  var _platform = 'Linux';
  var _platformVer = '6.1.0';
  if (/Macintosh/.test(_ua)) { _platform = 'macOS'; _platformVer = '15.0.0'; }
  else if (/Windows/.test(_ua)) { _platform = 'Windows'; _platformVer = '15.0.0'; }

  var _brands = [
    { brand: 'Chromium', version: _majorVer },
    { brand: 'Google Chrome', version: _majorVer },
    { brand: 'Not.A/Brand', version: '99' },
  ];
  var _fullBrands = [
    { brand: 'Chromium', version: _fullVer },
    { brand: 'Google Chrome', version: _fullVer },
    { brand: 'Not.A/Brand', version: '99.0.0.0' },
  ];

  if ('userAgentData' in navigator) {
    var _origUAData = navigator.userAgentData;
    Object.defineProperty(navigator, 'userAgentData', {
      get: function() {
        return {
          brands: _brands,
          mobile: false,
          platform: _platform,
          getHighEntropyValues: function(hints) {
            return Promise.resolve({
              brands: _brands,
              fullVersionList: _fullBrands,
              mobile: false,
              model: '',
              platform: _platform,
              platformVersion: _platformVer,
              architecture: /arm|aarch/i.test(navigator.platform || '') ? 'arm' : 'x86',
              bitness: '64',
              wow64: false,
              uaFullVersion: _fullVer,
            });
          },
          toJSON: function() {
            return { brands: _brands, mobile: false, platform: _platform };
          },
        };
      },
      configurable: true,
    });
  } else {
    // Chrome should always have userAgentData — add it if missing
    Object.defineProperty(navigator, 'userAgentData', {
      get: function() {
        return {
          brands: _brands,
          mobile: false,
          platform: _platform,
          getHighEntropyValues: function() {
            return Promise.resolve({
              brands: _brands,
              fullVersionList: _fullBrands,
              mobile: false, model: '',
              platform: _platform, platformVersion: _platformVer,
              architecture: 'x86', bitness: '64', wow64: false,
              uaFullVersion: _fullVer,
            });
          },
          toJSON: function() {
            return { brands: _brands, mobile: false, platform: _platform };
          },
        };
      },
      configurable: true,
    });
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// 18. CDP / Automation Artifact Cleanup
// ═══════════════════════════════════════════════════════════════════════════
// Remove or hide artifacts left by ChromeDriver, Playwright, Puppeteer,
// and Stagehand that anti-bot scripts scan for.
(function() {
  // ChromeDriver injects window.cdc_* properties
  var _cdcPattern = /^cdc_/;
  var _autoProps = [
    '__webdriver_evaluate', '__selenium_evaluate', '__webdriver_script_function',
    '__webdriver_script_func', '__webdriver_script_fn', '__fxdriver_evaluate',
    '__driver_evaluate', '__webdriver_unwrapped', '__driver_unwrapped',
    '__selenium_unwrapped', '__fxdriver_unwrapped', '_Selenium_IDE_Recorder',
    '_selenium', 'callSelenium', '__nightmare', '__phantomas',
    '__playwright_evaluation_script__',
  ];
  // Delete known automation globals
  for (var i = 0; i < _autoProps.length; i++) {
    try {
      if (_autoProps[i] in window) {
        delete window[_autoProps[i]];
      }
    } catch(e) {}
  }
  // Delete any cdc_* properties (ChromeDriver signature)
  try {
    Object.getOwnPropertyNames(window).forEach(function(prop) {
      if (_cdcPattern.test(prop)) {
        try { delete window[prop]; } catch(e) {}
      }
    });
  } catch(e) {}

  // Hide document.$cdc_ properties (another ChromeDriver vector)
  try {
    Object.getOwnPropertyNames(document).forEach(function(prop) {
      if (_cdcPattern.test(prop) || /^\$cdc_/.test(prop)) {
        try { delete document[prop]; } catch(e) {}
      }
    });
  } catch(e) {}

  // Prevent detection of injected scripts via Error stack traces
  // (some anti-bot inspects stack traces for '__puppeteer_evaluation_script__')
  var origError = Error;
  // eslint-disable-next-line no-global-assign
  window.Error = function() {
    var err = new origError(...arguments);
    try {
      var stack = err.stack || '';
      err.stack = stack
        .replace(/__playwright_evaluation_script__/g, '')
        .replace(/__puppeteer_evaluation_script__/g, '')
        .replace(/__stagehand_/g, '');
    } catch(e) {}
    return err;
  };
  window.Error.prototype = origError.prototype;
  window.Error.captureStackTrace = origError.captureStackTrace;
})();
`;

// ─────────────────────────────────────────────────────────────────────────────
// Apply stealth to a browser context
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Apply all stealth patches to a BrowserContext.
 * Must be called AFTER context creation but BEFORE any navigation.
 */
export async function applyStealthToContext(context: BrowserContext): Promise<void> {
  await context.addInitScript(STEALTH_INIT_SCRIPT);
}

/**
 * Check if stealth mode should be enabled.
 * Default: true (stealth ON unless explicitly disabled).
 */
export function isStealthEnabled(launchOption?: boolean): boolean {
  // Explicit launch option takes priority
  if (launchOption !== undefined) return launchOption;
  // Environment variable
  const env = process.env.AGENT_BROWSER_STEALTH;
  if (env !== undefined) return env.toLowerCase() !== 'false' && env !== '0';
  // Default: ON
  return true;
}
