
# Agent-Browser API Reference

## Core Functions

### Navigation Functions
- **navigate(url: string, options?: {waitUntil?: string, headers?: object})**: Navigate to a specific URL
  - `url`: Required URL string
  - `waitUntil`: Optional wait state ('load', 'domcontentloaded', 'networkidle')
  - `headers`: Optional request headers

- **back()**: Navigate to the previous page

- **forward()**: Navigate to the next page

- **reload()**: Refresh the current page

### Interaction Functions
- **click(selector: string, options?: {button?: string, clickCount?: number, delay?: number, newTab?: boolean})**: Click an element
  - `selector`: Required CSS selector or ref
  - `button`: Optional mouse button ('left', 'right', 'middle')
  - `clickCount`: Optional number of clicks
  - `delay`: Optional delay in milliseconds
  - `newTab`: Optional boolean to open in new tab

- **type(selector: string, text: string, options?: {delay?: number, clear?: boolean})**: Type text into an element
  - `selector`: Required CSS selector or ref
  - `text`: Required text to type
  - `delay`: Optional delay between characters
  - `clear`: Optional boolean to clear before typing

- **fill(selector: string, value: string)**: Fill an input field
  - `selector`: Required CSS selector or ref
  - `value`: Required value to set

- **check(selector: string)**: Check a checkbox
  - `selector`: Required CSS selector or ref

- **uncheck(selector: string)**: Uncheck a checkbox
  - `selector`: Required CSS selector or ref

- **upload(selector: string, files: string|string[])**: Upload files
  - `selector`: Required CSS selector or ref
  - `files`: Required file path(s)

### DOM Manipulation Functions
- **evaluate(script: string)**: Execute JavaScript in the current context
  - `script`: Required JavaScript code to execute

- **getByRole(role: string, options?: {name?: string, exact?: boolean, subaction?: string, value?: string})**: Find element by ARIA role
  - `role`: Required ARIA role
  - `name`: Optional name filter
  - `exact`: Optional exact match
  - `subaction`: Optional subaction ('click', 'fill', 'check', 'hover')
  - `value`: Optional value for input actions

- **getByText(text: string, options?: {exact?: boolean, subaction?: string})**: Find element by text content
  - `text`: Required text content
  - `exact`: Optional exact match
  - `subaction`: Optional subaction ('click', 'hover')

- **getByLabel(label: string, options?: {exact?: boolean, subaction?: string, value?: string})**: Find element by label
  - `label`: Required label text
  - `exact`: Optional exact match
  - `subaction`: Optional subaction ('click', 'fill', 'check')
  - `value`: Optional value for input actions

### Screenshot Functions
- **screenshot(options?: {region?: {x: number, y: number, width: number, height: number}, format?: string})**: Capture screenshot of the page
  - `region`: Optional region to capture
  - `format`: Optional format ('png', 'jpeg')

### Session Management
- **closeTab(tabId?: number)**: Close a specific tab or current tab
  - `tabId`: Optional tab ID

- **tabNew()**: Open a new tab

- **tabList()**: List all open tabs

- **tabSwitch(tabId: number)**: Switch to a specific tab
  - `tabId`: Required tab ID

### Utility Functions
- **wait(selector: string, options?: {timeout?: number, visible?: boolean})**: Wait for an element to appear/disappear
  - `selector`: Required CSS selector or ref
  - `timeout`: Optional timeout in milliseconds
  - `visible`: Optional visibility state

- **waitForUrl(url: string, options?: {timeout?: number})**: Wait for URL to change
  - `url`: Required URL pattern
  - `timeout`: Optional timeout in milliseconds

- **waitForLoadState(state: string, options?: {timeout?: number})**: Wait for page load state
  - `state`: Required load state ('load', 'domcontentloaded', 'networkidle')
  - `timeout`: Optional timeout in milliseconds

### Advanced Functions
- **evaluateHandle(script: string)**: Execute JavaScript and return a handle
  - `script`: Required JavaScript code to execute

- **dispatch(selector: string, event: string, options?: {eventInit?: object})**: Dispatch custom events
  - `selector`: Required CSS selector or ref
  - `event`: Required event name
  - `eventInit`: Optional event init options

- **scroll(selector?: string, options?: {x?: number, y?: number})**: Scroll to position or element
  - `selector`: Optional CSS selector or ref
  - `x`: Optional x coordinate
  - `y`: Optional y coordinate

- **scrollIntoView(selector: string, options?: {align?: string})**: Scroll element into view
  - `selector`: Required CSS selector or ref
  - `align`: Optional alignment ('center', 'top', 'bottom')

### Interaction Functions
- **dblclick(selector: string)**: Double click an element
  - `selector`: Required CSS selector or ref

- **focus(selector: string)**: Focus an element
  - `selector`: Required CSS selector or ref

- **drag(source: string, target: string)**: Drag an element to another
  - `source`: Required source selector
  - `target`: Required target selector

- **press(keys: string)**: Press keyboard keys
  - `keys`: Required key combination

- **tap(selector: string)**: Tap an element (for touch devices)
  - `selector`: Required CSS selector or ref

### Screenshot and Recording Functions
- **screenshot(options?: {region?: {x: number, y: number, width: number, height: number}, format?: string})**: Capture screenshot of the page
  - `region`: Optional region to capture
  - `format`: Optional format ('png', 'jpeg')

- **screencastStart(options?: {path?: string})**: Start screencast recording
  - `path`: Optional output path

- **screencastStop()**: Stop screencast recording

### Utility Functions
- **wait(selector: string, options?: {timeout?: number, visible?: boolean})**: Wait for an element to appear/disappear
  - `selector`: Required CSS selector or ref
  - `timeout`: Optional timeout in milliseconds
  - `visible`: Optional visibility state

- **waitForDownload(options?: {timeout?: number})**: Wait for download to complete
  - `timeout`: Optional timeout in milliseconds

- **waitForUrl(url: string, options?: {timeout?: number})**: Wait for URL to change
  - `url`: Required URL pattern
  - `timeout`: Optional timeout in milliseconds

- **waitForLoadState(state: string, options?: {timeout?: number})**: Wait for page load state
  - `state`: Required load state ('load', 'domcontentloaded', 'networkidle')
  - `timeout`: Optional timeout in milliseconds

### Device and Viewport Functions
- **setViewport(width: number, height: number)**: Set viewport dimensions
  - `width`: Required viewport width
  - `height`: Required viewport height

- **setDevice(device: string)**: Set device emulation
  - `device`: Required device name

- **setDeviceScaleFactor(scale: number, width: number, height: number, mobile?: boolean)**: Set device scale factor
  - `scale`: Required scale factor
  - `width`: Required viewport width
  - `height`: Required viewport height
  - `mobile`: Optional boolean for mobile emulation

### Network Functions
- **route(url: string, options?: {response?: object, abort?: boolean})**: Route network requests
  - `url`: Required URL pattern
  - `response`: Optional response object
  - `abort`: Optional boolean to abort requests

- **unroute(url?: string)**: Remove network routing
  - `url`: Optional URL pattern to unroute

- **requests(filter?: string, options?: {clear?: boolean})**: Get network requests
  - `filter`: Optional URL filter
  - `clear`: Optional boolean to clear requests

### Storage Functions
- **cookiesGet(urls?: string[])**: Get cookies
  - `urls`: Optional array of URLs to filter by

- **cookiesSet(cookies: object[])**: Set cookies
  - `cookies`: Required array of cookie objects

- **cookiesClear()**: Clear cookies

- **storageGet(key?: string, type: string)**: Get storage value
  - `key`: Optional storage key
  - `type`: Required storage type ('local', 'session')

- **storageSet(key: string, value: string, type: string)**: Set storage value
  - `key`: Required storage key
  - `value`: Required storage value
  - `type`: Required storage type ('local', 'session')

- **storageClear(type: string)**: Clear storage
  - `type`: Required storage type ('local', 'session')

### Dialog Functions
- **dialog(response: string, promptText?: string)**: Handle dialogs
  - `response`: Required response ('accept', 'dismiss')
  - `promptText`: Optional prompt text

### Device Emulation Functions
- **setGeolocation(latitude: number, longitude: number, accuracy?: number)**: Set geolocation
  - `latitude`: Required latitude
  - `longitude`: Required longitude
  - `accuracy`: Optional accuracy

- **setPermissions(permissions: string[], grant: boolean)**: Set permissions
  - `permissions`: Required array of permissions
  - `grant`: Required boolean to grant permissions

### Advanced DOM Functions
- **getAttribute(selector: string, attribute: string)**: Get element attribute
  - `selector`: Required CSS selector or ref
  - `attribute`: Required attribute name

- **getText(selector: string)**: Get element text
  - `selector`: Required CSS selector or ref

- **isVisible(selector: string)**: Check if element is visible
  - `selector`: Required CSS selector or ref

- **isEnabled(selector: string)**: Check if element is enabled
  - `selector`: Required CSS selector or ref

- **isChecked(selector: string)**: Check if element is checked
  - `selector`: Required CSS selector or ref

- **count(selector: string)**: Count matching elements
  - `selector`: Required CSS selector or ref

- **boundingBox(selector: string)**: Get element bounding box
  - `selector`: Required CSS selector or ref

- **styles(selector: string)**: Get element styles
  - `selector`: Required CSS selector or ref

- **innerText(selector: string)**: Get element inner text
  - `selector`: Required CSS selector or ref

- **innerHtml(selector: string)**: Get element inner HTML
  - `selector`: Required CSS selector or ref

- **inputValue(selector: string)**: Get element input value
  - `selector`: Required CSS selector or ref

- **setValue(selector: string, value: string)**: Set element value
  - `selector`: Required CSS selector or ref
  - `value`: Required value to set

- **getByPlaceholder(placeholder: string, options?: {exact?: boolean, subaction?: string, value?: string})**: Find element by placeholder text
  - `placeholder`: Required placeholder text
  - `exact`: Optional exact match
  - `subaction`: Optional subaction ('click', 'fill')
  - `value`: Optional value for input actions

- **getByAltText(text: string, options?: {exact?: boolean, subaction?: string})**: Find element by alt text
  - `text`: Required alt text
  - `exact`: Optional exact match
  - `subaction`: Optional subaction ('click', 'hover')

- **getByTitle(text: string, options?: {exact?: boolean, subaction?: string})**: Find element by title
  - `text`: Required title text
  - `exact`: Optional exact match
  - `subaction`: Optional subaction ('click', 'hover')

- **getByTestId(testId: string, options?: {subaction?: string, value?: string})**: Find element by test ID
  - `testId`: Required test ID
  - `subaction`: Optional subaction ('click', 'fill', 'check', 'hover')
  - `value`: Optional value for input actions

- **nth(selector: string, index: number, options?: {subaction?: string, value?: string})**: Get nth matching element
  - `selector`: Required CSS selector or ref
  - `index`: Required index
  - `subaction`: Optional subaction ('click', 'fill', 'check', 'hover', 'text')
  - `value`: Optional value for input actions

### Multi-select Functions
- **multiSelect(selector: string, options?: {value?: string})**: Select multiple options
  - `selector`: Required CSS selector or ref
  - `value`: Optional value to select

### Clipboard Functions
- **clipboard(operation: string, text?: string)**: Clipboard operations
  - `operation`: Required operation ('copy', 'paste', 'read')
  - `text`: Optional text for copy/paste

### Highlight Functions
- **highlight(selector: string)**: Highlight an element
  - `selector`: Required CSS selector or ref

### Clear Functions
- **clear(selector: string)**: Clear an input field
  - `selector`: Required CSS selector or ref

### Select All Functions
- **selectAll(selector: string)**: Select all text in an element
  - `selector`: Required CSS selector or ref

### Frame Functions
- **frame(selector?: string, name?: string, url?: string)**: Switch to frame
  - `selector`: Optional frame selector
  - `name`: Optional frame name
  - `url`: Optional frame URL

- **mainframe()**: Switch to main frame

### Keyboard Functions
- **keyboard(keys: string)**: Simulate keyboard input
  - `keys`: Required key combination

### Mouse Functions
- **wheel(deltaX?: number, deltaY?: number, selector?: string)**: Scroll with wheel
  - `deltaX`: Optional x delta
  - `deltaY`: Optional y delta
  - `selector`: Optional target selector

### Window Functions
- **windowNew()**: Open a new window

### Miscellaneous Functions
- **pause()**: Pause execution
- **title()**: Get current page title
- **url()**: Get current page URL
- **getByNth(selector: string, index: number, options?: {subaction?: string})**: Get nth matching element
  - `selector`: Required CSS selector or ref
  - `index`: Required index
  - `subaction`: Optional subaction ('click', 'fill', 'check', 'hover', 'text')

- **addScript(content?: string, url?: string)**: Add script to page
  - `content`: Optional script content
  - `url`: Optional script URL

- **addStyle(content?: string, url?: string)**: Add style to page
  - `content`: Optional style content
  - `url`: Optional style URL

- **emulateMedia(media?: string, colorScheme?: string, reducedMotion?: string, forcedColors?: string)**: Emulate media features
  - `media`: Optional media type ('screen', 'print')
  - `colorScheme`: Optional color scheme ('light', 'dark', 'no-preference')
  - `reducedMotion`: Optional reduced motion preference
  - `forcedColors`: Optional forced colors mode

- **offline(offline: boolean)**: Set offline mode
  - `offline`: Required boolean

- **headers(headers: object)**: Set extra HTTP headers
  - `headers`: Required headers object

- **userAgent(userAgent: string)**: Set user agent
  - `userAgent`: Required user agent string

- **expose(name: string)**: Expose global variable
  - `name`: Required variable name

- **addInitScript(content?: string, url?: string)**: Add initialization script
  - `content`: Optional script content
  - `url`: Optional script URL

- **keydown(keys: string)**: Simulate key down event
  - `keys`: Required key combination

- **keyup(keys: string)**: Simulate key up event
  - `keys`: Required key combination

- **insertText(selector: string, text: string)**: Insert text into element
  - `selector`: Required CSS selector or ref
  - `text`: Required text to insert

- **swipe(x1: number, y1: number, x2: number, y2: number)**: Swipe on touch device
  - `x1`: Required start x coordinate
  - `y1`: Required start y coordinate
  - `x2`: Required end x coordinate
  - `y2`: Required end y coordinate

- **deviceList()**: List available devices

- **diffSnapshot()**: Diff with previous snapshot

- **diffScreenshot()**: Diff with previous screenshot

- **diffUrl(url: string)**: Diff with URL
  - `url`: Required URL to diff with

- **waitForFunction(script: string, options?: {timeout?: number})**: Wait for JavaScript condition
  - `script`: Required JavaScript condition
  - `timeout`: Optional timeout in milliseconds

- **mousemove(selector?: string, options?: {x?: number, y?: number})**: Move mouse
  - `selector`: Optional target selector
  - `x`: Optional x coordinate
  - `y`: Optional y coordinate

- **mousedown(selector?: string)**: Simulate mouse down
  - `selector`: Optional target selector

- **mouseup(selector?: string)**: Simulate mouse up
  - `selector`: Optional target selector

- **bringtofront()**: Bring window to front

- **responsebody(url?: string)**: Get response body
  - `url`: Optional URL to filter by

- **recordingStart(path: string, url?: string)**: Start recording
  - `path`: Required output path
  - `url`: Optional URL to record

- **recordingStop()**: Stop recording

- **recordingRestart(path: string, url?: string)**: Restart recording
  - `path`: Required output path
  - `url`: Optional URL to record

- **traceStart(options?: {screenshots?: boolean, snapshots?: boolean})**: Start tracing
  - `screenshots`: Optional boolean to capture screenshots
  - `snapshots`: Optional boolean to capture snapshots

- **traceStop(path?: string)**: Stop tracing
  - `path`: Optional output path

- **profilerStart(categories?: string[])**: Start profiling
  - `categories`: Optional array of categories

- **profilerStop(path?: string)**: Stop profiling
  - `path`: Optional output path

- **harStart()**: Start HAR recording

- **harStop(path: string)**: Stop HAR recording
  - `path`: Required output path

- **stateSave(path: string)**: Save browser state
  - `path`: Required output path

- **stateLoad(path: string)**: Load browser state
  - `path`: Required path to load

- **stateList()**: List saved states

- **stateClear(sessionName?: string, all?: boolean)**: Clear browser state
  - `sessionName`: Optional session name
  - `all`: Optional boolean to clear all

- **stateShow(filename: string)**: Show browser state
  - `filename`: Required filename

- **stateClean(days: number)**: Clean up old states
  - `days`: Required number of days

- **stateRename(oldName: string, newName: string)**: Rename state
  - `oldName`: Required old name
  - `newName`: Required new name

- **console(clear?: boolean)**: Manage console messages
  - `clear`: Optional boolean to clear

- **errors(clear?: boolean)**: Manage page errors
  - `clear`: Optional boolean to clear

- **pdf(path: string, format?: string)**: Generate PDF
  - `path`: Required output path
  - `format`: Optional paper format

- **setContent(content: string)**: Set page content
  - `content`: Required HTML content

- **timezone(timezone: string)**: Set timezone
  - `timezone`: Required timezone

- **locale(locale: string)**: Set locale
  - `locale`: Required locale

- **credentials(credentials: object)**: Set credentials
  - `credentials`: Required credentials object


## Return Types
All functions return a Promise with a response object containing:
- `success`: Boolean indicating success
- `data`: Function-specific return data (e.g., screenshot path, element text, element properties)
- `error`: Error message if operation failed

## Examples
```javascript
// Basic navigation and interaction
await executeCommand({
  action: 'launch',
  browser: 'chromium',
  headless: false
});

await executeCommand({
  action: 'navigate',
  url: 'https://example.com',
  waitUntil: 'domcontentloaded'
});

// Find and interact with elements
await executeCommand({
  action: 'getByRole',
  role: 'button',
  name: 'Submit',
  subaction: 'click'
});

// Type into a form field
await executeCommand({
  action: 'fill',
  selector: '#username',
  value: 'testuser'
});

// Wait for element to appear
await executeCommand({
  action: 'wait',
  selector: '#loading-spinner',
  timeout: 10000
});

// Take screenshot
const screenshotResponse = await executeCommand({
  action: 'screenshot',
  format: 'png'
});

// Get element text
const textResponse = await executeCommand({
  action: 'getText',
  selector: '#page-title'
});

// Advanced example with error handling
try {
  const response = await executeCommand({
    action: 'click',
    selector: '#submit-button',
    button: 'right',
    clickCount: 2
  });

  if (!response.success) {
    console.error(`Error: ${response.error}`);
  } else {
    console.log('Action completed successfully');
  }
} catch (error) {
  console.error('Unexpected error:', error);
}
## Summary
This API reference provides comprehensive documentation for the core functions of the [dextonai/agent-browser] automation tool. The API supports both Rust and Node.js environments, enabling advanced browser automation with features including:

1. **Navigation**: Full control over browser navigation with history management
2. **Interaction**: Precise element manipulation with mouse, keyboard, and touch events
3. **DOM Inspection**: Advanced element querying and property inspection
4. **Recording and Screenshots**: Capture screenshots and screencasts
5. **Network Control**: Route and intercept network requests
6. **State Management**: Save and load browser states
7. **Device Emulation**: Simulate different devices and viewport sizes
8. **Advanced Features**: Profiling, tracing, and performance monitoring

The API follows a command-based pattern where each action is executed asynchronously and returns a response object with success status and relevant data.

---
**Completed API reference for [dextonai/agent-browser]**

This documentation provides comprehensive coverage of the core functions available in the agent-browser automation tool. The API supports both Rust and Node.js environments, enabling advanced browser automation with a wide range of capabilities.

For more information about the implementation details, please refer to the source code in the [dextonai/agent-browser](https://github.com/dextonai/agent-browser) repository.

