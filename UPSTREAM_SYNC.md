# Upstream Sync Process

This repository is a fork of [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser).

## Remotes

```
origin    → dextonai/agent-browser (our fork)
upstream  → vercel-labs/agent-browser (upstream)
```

## Sync Process

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### Review Checklist

After merging upstream changes, review:

1. **`BrowserManager`** (`src/browser.ts`) — Breaking changes to launch/close/snapshot APIs
2. **`executeCommand()`** (`src/actions.ts`) — New or renamed command actions
3. **`Command` types** (`src/types.ts`) — Type changes that affect our adapter layer
4. **Session persistence** — Changes to state_save/state_load behavior
5. **Ref system** — Changes to snapshot ref generation or `getLocatorFromRef()`

### After Merge

```bash
pnpm install
pnpm test
pnpm build
```

If all pass, push:

```bash
git push origin main
```

## Sync Cadence

- Monthly sync, or on major upstream releases
- Watch upstream releases: https://github.com/vercel-labs/agent-browser/releases
