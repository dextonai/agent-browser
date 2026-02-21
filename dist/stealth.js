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
// ─────────────────────────────────────────────────────────────────────────────
// Chromium Args — remove automation signals at the browser level
// ─────────────────────────────────────────────────────────────────────────────
export const STEALTH_CHROMIUM_ARGS = [
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
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        ],
        arm64: [
            'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        ],
    },
    darwin: {
        arm64: [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        ],
        x64: [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        ],
    },
    win32: {
        x64: [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        ],
    },
};
/**
 * Pick a realistic user-agent for the current platform.
 * Never includes "HeadlessChrome" substring.
 */
export function getRealisticUserAgent() {
    const os = process.platform;
    const arch = process.arch === 'arm64' ? 'arm64' : 'x64';
    const platformAgents = REALISTIC_USER_AGENTS[os];
    const agents = platformAgents?.[arch] ?? REALISTIC_USER_AGENTS.linux.x64;
    return agents[Math.floor(Math.random() * agents.length)];
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
// 3. Permissions API — make Notification permission match real behavior
// ═══════════════════════════════════════════════════════════════════════════
const originalQuery = window.navigator.permissions?.query?.bind(window.navigator.permissions);
if (originalQuery) {
  Object.defineProperty(window.navigator.permissions, 'query', {
    value: function(parameters) {
      if (parameters.name === 'notifications') {
        return Promise.resolve({ state: Notification.permission, onchange: null });
      }
      return originalQuery(parameters);
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
// 9. WebGL Renderer — hide "SwiftShader" which screams headless
// ═══════════════════════════════════════════════════════════════════════════
const getParameterOrig = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function(parameter) {
  // UNMASKED_VENDOR_WEBGL
  if (parameter === 37445) return 'Google Inc. (NVIDIA)';
  // UNMASKED_RENDERER_WEBGL
  if (parameter === 37446) return 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1080 Direct3D11 vs_5_0 ps_5_0, D3D11)';
  return getParameterOrig.call(this, parameter);
};
if (typeof WebGL2RenderingContext !== 'undefined') {
  const getParameter2Orig = WebGL2RenderingContext.prototype.getParameter;
  WebGL2RenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) return 'Google Inc. (NVIDIA)';
    if (parameter === 37446) return 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1080 Direct3D11 vs_5_0 ps_5_0, D3D11)';
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
`;
// ─────────────────────────────────────────────────────────────────────────────
// Apply stealth to a browser context
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Apply all stealth patches to a BrowserContext.
 * Must be called AFTER context creation but BEFORE any navigation.
 */
export async function applyStealthToContext(context) {
    await context.addInitScript(STEALTH_INIT_SCRIPT);
}
/**
 * Check if stealth mode should be enabled.
 * Default: true (stealth ON unless explicitly disabled).
 */
export function isStealthEnabled(launchOption) {
    // Explicit launch option takes priority
    if (launchOption !== undefined)
        return launchOption;
    // Environment variable
    const env = process.env.AGENT_BROWSER_STEALTH;
    if (env !== undefined)
        return env.toLowerCase() !== 'false' && env !== '0';
    // Default: ON
    return true;
}
//# sourceMappingURL=stealth.js.map