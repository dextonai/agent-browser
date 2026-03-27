# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser!

## Development Setup

### Prerequisites

- Node.js 18+
- npm or pnpm
- Rust (for native binary, optional)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/vercel-labs/agent-browser
cd agent-browser

# Install dependencies
pnpm install

# Build everything (Node.js + Rust native binary)
pnpm build

# Link globally for testing
pnpm link --global

# Install Chromium
agent-browser install
```

### Build Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build Node.js package |
| `pnpm build:native` | Build Rust native binary (requires Rust) |
| `pnpm build:all` | Build both |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests |

### Environment Variables

For development, you can set these to override defaults:

```bash
export AGENT_BROWSER_EXECUTABLE_PATH=/path/to/chromium
export AGENT_BROWSER_HEADLESS=false  # See browser while testing
```

## Coding Style

- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and types
- Use **kebab-case** for file names
- Prefer `async/await` over raw Promises
- Always handle errors explicitly
- Add TypeScript types for all function parameters

## Project Structure

```
src/
  cli/          # CLI argument parsing
  commands/     # Individual command implementations
  browser/      # Browser management (Playwright wrapper)
  native/       # Native Rust CLI bridge
  types/        # TypeScript type definitions
```

## Submitting Changes

### 1. Fork and Create a Branch

```bash
git checkout -b feat/my-new-feature
# or
git checkout -b fix/my-bug-fix
```

### 2. Make Your Changes

- Write code following the style guide above
- Add or update tests as needed
- Update documentation if behavior changed

### 3. Test Your Changes

```bash
pnpm build
pnpm lint
pnpm test

# Manual test
agent-browser open https://example.com
agent-browser snapshot
agent-browser close
```

### 4. Submit a Pull Request

- Fill out the PR template completely
- Reference any related issues
- Ensure CI passes
- One approval required to merge

## Reporting Bugs

When reporting bugs, include:

- `agent-browser` version (`agent-browser --version`)
- Platform (macOS/Linux/Windows)
- Steps to reproduce
- Expected vs actual behavior
- Error messages or screenshots

## Suggesting Features

Open an issue with:

- Clear problem you're trying to solve
- Proposed solution
- Example use case
- Any relevant links or references

## Code of Conduct

Be respectful and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 license.
