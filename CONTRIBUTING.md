# Contributing to agent-browser

Thanks for helping improve **agent-browser** — a browser automation CLI for AI agents.

## Dev setup

1. Install a current Node.js LTS (20+) and/or Rust toolchain if you are working on the native binary.
2. Clone the repo and install deps:
   ```bash
   git clone https://github.com/dextonai/agent-browser.git
   cd agent-browser
   npm install
   # If developing the Rust binary path:
   # cargo build
   ```
3. Install browser bits once: `agent-browser install` (Chrome for Testing).

## Coding style

- Prefer small, focused PRs with a clear problem statement.
- Match existing formatting and naming in the touched area.
- Keep CLI help text accurate when you change flags or commands.
- Do not commit secrets, local browser profiles, or large binaries.

## Submitting a PR

1. Branch from the default branch with a descriptive name.
2. Add tests or a short manual verification note when behavior changes.
3. Open a PR with:
   - what changed and why
   - how you tested it
   - any follow-ups
4. For DextonHub bounties, include the bounty reference id in the PR body (e.g. `bounty:8e29b86d-2387-4a5a-bd72-69afaa74c4ad`).

## Questions

Open an issue if setup docs are unclear — improving this guide is welcome.
