# Contributing to agent-browser

Thanks for your interest in contributing to `agent-browser`! This guide covers how to set up the project locally, the expected coding style, and how to submit a pull request.

## Development setup

### Prerequisites

- Node.js 20 or newer
- pnpm
- Rust toolchain (`rustup` recommended)
- Chrome/Chromium or Chrome for Testing
- Docker (optional, only needed for cross-platform build helpers)

### Clone and install dependencies

```bash
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
pnpm install
```

### Build from source

Sync package metadata and build the native CLI:

```bash
pnpm run version:sync
pnpm run build:native
```

For platform-specific build helpers, use the existing package scripts:

```bash
pnpm run build:linux
pnpm run build:macos
pnpm run build:windows
```

### Install browser dependencies

After building or installing the package, install Chrome for Testing:

```bash
agent-browser install
```

On Linux, you may also need system dependencies:

```bash
agent-browser install --with-deps
```

### Verify your changes

Before opening a pull request, run the checks that apply to your change:

```bash
pnpm run version:sync
pnpm run build:native
```

If you change Rust code, also run the relevant Cargo checks from the `cli` crate:

```bash
cargo fmt --manifest-path cli/Cargo.toml
cargo test --manifest-path cli/Cargo.toml
```

## Coding style guidelines

- Keep changes focused and small. One pull request should solve one problem.
- Follow the existing project structure and naming conventions.
- Prefer clear, explicit command names and error messages for CLI-facing behavior.
- Keep documentation examples copy-pasteable and tested when practical.
- Update README or docs when adding or changing user-facing behavior.
- Do not commit generated build artifacts unless they are already part of the documented release process.
- Avoid unrelated formatting changes in files you are not modifying.

## Submitting a pull request

1. Create a feature branch from the latest `main` branch.
2. Make your changes and include tests or documentation updates when relevant.
3. Run the applicable checks locally.
4. Write a clear pull request description that includes:
   - What changed
   - Why the change is needed
   - How it was tested
   - Any follow-up work or known limitations
5. Link related issues using GitHub keywords such as `Fixes #123` or `Refs #123`.
6. Respond to review feedback with follow-up commits.

## Reporting issues

When opening an issue, include:

- Operating system and version
- Node.js, pnpm, and Rust versions when relevant
- The exact command you ran
- Expected behavior
- Actual behavior and logs/errors
- Minimal reproduction steps

Clear reports and focused pull requests help maintainers review contributions faster.
