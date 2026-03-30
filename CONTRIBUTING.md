# Contributing to agent-browser

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (for npm/pnpm)
- [Rust](https://rustup.rs/) (for native binary build)
- [Chromium](https://www.chromium.org/) (for browser automation)

### Installation

```bash
# Clone the repository
git clone https://github.com/vercel-labs/agent-browser
cd agent-browser

# Install dependencies
pnpm install

# Build the project
pnpm build

# Build native Rust binary (requires Rust toolchain)
pnpm build:native

# Link globally for CLI use
pnpm link --global

# Download Chromium browser
agent-browser install
# or on Linux with system deps:
agent-browser install --with-deps
```

### Running Tests

```bash
pnpm test
```

### Code Style

- Use **TypeScript** for Node.js/JavaScript code
- Use **Rust** for performance-critical native code
- Run `pnpm lint` before committing
- Follow existing patterns in the codebase

## Submitting a PR

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** — ensure all tests pass:
   ```bash
   pnpm test
   pnpm lint
   ```

3. **Commit** with a clear message:
   ```bash
   git commit -m "feat: add support for new selector type"
   ```

4. **Push** to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```

5. **Open a Pull Request** — reference the issue number if applicable:
   ```bash
   gh pr create --fill
   ```

## Code Review Process

- Maintainers will review your PR as soon as possible
- Address any feedback by pushing new commits to the same branch
- Once approved, your PR will be merged

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.
