
# Agent Memory Persistence Architecture

This document provides a deep dive into how the agent-browser maintains session state, cookies, local storage, and history across browser restarts.

## Overview

The agent-browser implements multiple mechanisms for memory persistence to ensure that user sessions, cookies, and local storage are preserved across browser restarts and sessions:

1. **Persistent Contexts**: Uses Playwright's persistent browser contexts
2. **Storage State Management**: Saves and restores cookies, localStorage, and sessionStorage
3. **Session Files**: Encrypted JSON state files for session persistence
4. **Profile Support**: Integration with browser profiles for durable storage

## Memory Persistence Mechanisms

### 1. Persistent Browser Contexts

The agent-browser uses Playwright's persistent contexts to maintain browser state across sessions:

```javascript
// In browser.js - Launching with persistent context
if (hasProfile) {
    // Profile uses persistent context for durable cookies/storage
    const profilePath = options.profile.replace(/^~\//, os.homedir() + '/');
    context = await launcher.launchPersistentContext(profilePath, {
        // Configuration options
    });
    this.isPersistentContext = true;
}
```

Persistent contexts ensure that:
- Cookies are preserved across browser restarts
- LocalStorage and sessionStorage are maintained
- Browser profiles (including extensions) remain intact

### 2. Storage State Management

The agent captures and restores browser storage state using Playwright's `storageState` API:

```javascript
// In browser.js - Saving storage state
async saveStorageState(path) {
    const context = this.contexts[0];
    if (context) {
        await context.storageState({ path });
    }
}

// In browser.js - Capturing state from current context
let storageState;
if (currentContext) {
    try {
        storageState = await currentContext.storageState();
    } catch {
        // Ignore errors - context might be closed or invalid
    }
}
```

The storage state includes:
- Cookies for all domains
- localStorage data
- sessionStorage data
- Other browser-specific storage

### 3. Session Files

The agent uses encrypted JSON files to store session state between browser sessions:

```javascript
// In state-utils.js - Writing state files
export function writeStateFile(filepath, data) {
    const key = getEncryptionKey();
    const jsonData = JSON.stringify(data, null, 2);
    if (key) {
        const encrypted = encryptData(jsonData, key);
        fs.writeFileSync(filepath, JSON.stringify(encrypted, null, 2));
        return { encrypted: true };
    }
    fs.writeFileSync(filepath, jsonData);
    return { encrypted: false };
}

// In state-utils.js - Reading state files
export function readStateFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const parsed = JSON.parse(content);
    if (isEncryptedPayload(parsed)) {
        const key = getEncryptionKey();
        if (!key) {
            throw new Error(`State file is encrypted but ${ENCRYPTION_KEY_ENV} is not set.`);
        }
        const decrypted = decryptData(parsed, key);
        return { data: JSON.parse(decrypted), wasEncrypted: true };
    }
    return { data: parsed, wasEncrypted: false };
}
```

Session files are stored in:
```
~/.agent-browser/sessions/
```

Each session file follows the naming pattern: `{SESSION_NAME}-{SESSION_ID}.json`

### 4. Auto-Save and Auto-Load

The agent automatically saves and loads session state:

```javascript
// In browser.js - Auto-load state file
if (!storageState && options.autoStateFilePath) {
    try {
        const fs = await import('fs');
        if (fs.existsSync(options.autoStateFilePath)) {
            const content = fs.readFileSync(options.autoStateFilePath, 'utf8');
            const parsed = JSON.parse(content);
            if (isEncryptedPayload(parsed)) {
                const key = getEncryptionKey();
                if (key) {
                    try {
                        const decrypted = decryptData(parsed, key);
                        storageState = JSON.parse(decrypted);
                    } catch (decryptErr) {
                        // Handle decryption errors
                    }
                } else {
                    // Handle missing encryption key
                }
            } else {
                storageState = options.autoStateFilePath;
            }
        }
    } catch (err) {
        // Handle file read errors
    }
}
```

### 5. Profile Support

The agent supports browser profiles for persistent storage:

```javascript
// In browser.js - Launching with profile
if (hasProfile) {
    // Profile uses persistent context for durable cookies/storage
    const profilePath = options.profile.replace(/^~\//, os.homedir() + '/');
    context = await launcher.launchPersistentContext(profilePath, {
        // Configuration options
    });
    this.isPersistentContext = true;
}
```

Browser profiles provide:
- Persistent cookies across browser sessions
- LocalStorage and sessionStorage persistence
- Extension state preservation

## Memory Persistence Flow

1. **Initialization**: When the agent starts, it checks for existing session files and loads them if available.

2. **Session Creation**: The agent creates a persistent browser context with the loaded storage state.

3. **Browser Operations**: All browser operations (navigation, form submissions, etc.) maintain the persistent state.

4. **Session Termination**: When the agent session ends, it saves the current storage state to a file.

5. **Restart**: On the next launch, the agent loads the saved state and restores the browser context.

## API for Memory Management

The agent provides API endpoints for managing memory persistence:

### Cookies Management

```javascript
// Get cookies
await browser.execute('cookies_get', { urls: ['https://example.com'] });

// Set cookies
await browser.execute('cookies_set', {
    cookies: [
        { name: 'test', value: 'cookie', url: 'https://example.com' }
    ]
});

// Clear cookies
await browser.execute('cookies_clear', { urls: ['https://example.com'] });
```

### Storage Management

```javascript
// Get localStorage
await browser.execute('storage_get', { type: 'local' });

// Set localStorage
await browser.execute('storage_set', {
    type: 'local',
    key: 'testKey',
    value: 'testValue'
});

// Clear localStorage
await browser.execute('storage_clear', { type: 'local' });
```

## Security Considerations

1. **Encryption**: Session files are encrypted using AES-256 when an encryption key is available.

2. **File Validation**: The agent validates session names and IDs to prevent path traversal attacks.

3. **Secure Storage**: Session files are stored in a user-specific directory with restricted permissions (0o700).

4. **Key Management**: Encryption keys are managed through environment variables.

## Browser Restart Behavior

When the browser is restarted:

1. **Persistent Contexts**: If a persistent context was used, it is automatically restored with all cookies and storage.

2. **Session Files**: If an auto-save file exists, it is loaded to restore the browser state.

3. **Profile Support**: If a profile was used, it is automatically loaded with all persistent data.

## Limitations

1. **Ephemeral Sessions**: Regular browser sessions (without persistent context) are not preserved across restarts.

2. **Encryption**: Without an encryption key, encrypted session files cannot be loaded.

3. **Profile Limitations**: Some browser profiles may have restrictions on what can be persisted.

## Conclusion

The agent-browser implements a robust memory persistence system that ensures user sessions, cookies, and local storage are preserved across browser restarts. This allows for seamless continuation of browsing sessions and maintains user-specific data between agent launches.

The architecture combines Playwright's persistent contexts with custom session file management to provide a comprehensive solution for memory persistence in browser automation.
