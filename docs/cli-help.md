
# Agent-Browser CLI Help

## Overview
Agent-Browser is a browser automation CLI for AI agents. This documentation provides an overview of the available commands and their usage.

---

## Core Commands

### Navigation
- **open/navigate/goto <url>**
  Navigate to a URL. Supports relative URLs (converted to absolute) and special protocols (http, https, about, data, file, chrome-extension, chrome).

- **back**
  Navigate back in browser history.

- **forward**
  Navigate forward in browser history.

- **reload**
  Reload the current page.

---

### Interaction
- **click <selector> [--new-tab]**
  Click an element by selector. Optionally open in a new tab.

- **dblclick <selector>**
  Double-click an element by selector.

- **fill <selector> <text>**
  Fill a form field with text.

- **type <selector> <text>**
  Type text into an element.

- **hover <selector>**
  Hover over an element.

- **focus <selector>**
  Focus an element.

- **check <selector>**
  Check a checkbox or radio button.

- **uncheck <selector>**
  Uncheck a checkbox or radio button.

- **select <selector> <value...>**
  Select an option in a dropdown.

- **drag <source> <target>**
  Drag an element from source to target.

- **upload <selector> <files...>**
  Upload files to an input element.

- **download <selector> <path>**
  Download a file from a specified selector to a path.

---

### Keyboard
- **press/key <key>**
  Press a key.

- **keydown <key>**
  Press down a key.

- **keyup <key>**
  Release a key.

- **keyboard <type|inserttext> <text>**
  Type text using keyboard actions.

---

### Scroll
- **scroll [direction] [amount] [--selector <sel>]**
  Scroll the page. Direction defaults to "down" and amount defaults to 300 pixels.

- **scrollintoview/scrollinto <selector>**
  Scroll an element into view.

---

### Wait
- **wait --url <pattern>**
  Wait until a URL matches a pattern.

- **wait --load <state>**
  Wait for network load state (e.g., "networkidle").

- **wait --fn <expression>**
  Wait for a JavaScript expression to evaluate to true.

---

### Get Information
- **get <text|html|value|attr|url|title|count|box|styles|cdp-url> [args...]**
  Retrieve information from the page:
  - `text`: Get text content of an element.
  - `html`: Get HTML content of an element.
  - `value`: Get input value.
  - `attr`: Get attribute value.
  - `url`: Get current URL.
  - `title`: Get page title.
  - `count`: Count elements matching a selector.
  - `box`: Get bounding box of an element.
  - `styles`: Get styles of an element.
  - `cdp-url`: Get CDP URL.

- **is <visible|enabled|checked> <selector>**
  Check if an element is visible, enabled, or checked.

---

### Mouse
- **mouse <move|down|up|wheel> [args...]**
  Perform mouse actions:
  - `move <x> <y>`: Move mouse to coordinates.
  - `down`: Press mouse button.
  - `up`: Release mouse button.
  - `wheel <deltaY> [deltaX]`: Scroll with mouse wheel.

---

### Set Configuration
- **set <viewport|device|geo|offline|headers|credentials|media> [args...]**
  Set various configurations:
  - `viewport <width> <height> [scale]`: Set viewport dimensions.
  - `device <name>`: Set device configuration.
  - `geo <latitude> <longitude>`: Set geolocation.
  - `offline`: Set offline mode.
  - `headers <json>`: Set HTTP headers.
  - `credentials <username> <password>`: Set authentication credentials.
  - `media <dark|light|reduced-motion>`: Set media preferences.

---

### Network
- **network <route|unroute|requests|request|har> [args...]**
  Manage network operations:
  - `route <url> [--abort|--body <json>]`: Route requests.
  - `unroute`: Unroute requests.
  - `requests [--clear|--filter <pattern>|--type <type>|--method <method>|--status <status>]`: List requests.
  - `request <requestId>`: Get request details.
  - `har <start|stop> [path]`: Start/stop HAR recording.

---

### Storage
- **storage <local|session> [get|set|clear] [key] [value]**
  Manage browser storage:
  - `get`: Retrieve a value.
  - `set <key> <value>`: Set a value.
  - `clear`: Clear storage.

---

## Common Options
- `--session <name>`: Specify a session name.
- `--json`: Output JSON.
- `--headed`: Run in headed mode.
- `--debug`: Enable debug mode.
- `--headers <json>`: Set HTTP headers.
- `--provider <name>`: Specify a provider.
- `--device <name>`: Specify a device.

---

## Examples
```bash
# Navigate to a URL
agent-browser open https://example.com

# Click an element
agent-browser click "#submit-button"

# Fill a form field
agent-browser fill "#username" "myusername"

# Wait for a URL pattern
agent-browser wait --url "**/dashboard"

# Set viewport
agent-browser set viewport 1200 800

# Get page title
agent-browser get title
```

---

## Installation
To install and use Agent-Browser, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/dextonai/agent-browser.git
   ```

2. Build the project:
   ```bash
   cd agent-browser
   npm run build:all-platforms
   ```

3. Run the CLI:
   ```bash
   ./bin/agent-browser
   ```

---

## Additional Scripts
- `npm run version:sync`: Sync version information.
- `npm run build:native`: Build native binaries.
- `npm run build:linux`: Build for Linux.
- `npm run build:macos`: Build for macOS.
- `npm run build:windows`: Build for Windows.
- `npm run build:all-platforms`: Build for all platforms.
- `npm run release`: Create a release.
- `npm run postinstall`: Post-installation tasks.
- `npm run changeset`: Manage changesets.
- `npm run ci:version`: CI versioning.
- `npm run ci:publish`: CI publishing.
- `npm run build:dashboard`: Build dashboard.
