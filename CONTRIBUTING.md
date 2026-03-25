# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Coding Style](#coding-style)
- [Testing](#testing)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Release Process](#release-process)

## Code of Conduct

Be respectful and inclusive. We welcome contributions from everyone.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Build the project:
   ```bash
   pnpm run build
   ```

## Development Environment

### Prerequisites

- **Node.js** 20+ (we recommend using [nvm](https://github.com/nvm-sh/nvm))
- **pnpm** (package manager)
- **Rust** (for native CLI development)
- **Chromium** (installed via `agent-browser install`)

### Installing pnpm

```bash
npm install -g pnpm
```

### Installing Rust (for native CLI)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Project Structure

```
agent-browser/
├── bin/              # Compiled binaries
├── cli/              # Rust CLI source
├── dist/             # Compiled TypeScript
├── docs/             # Documentation
├── src/              # Node.js source
├── test/             # Test files
├── skills/           # Agent skills
└── scripts/          # Build/utility scripts
```

### Running in Development

```bash
# Start the daemon in dev mode
pnpm run dev

# Run TypeScript compiler in watch mode
pnpm run build --watch

# Run tests in watch mode
pnpm run test:watch
```

## Coding Style

### TypeScript

We use **Prettier** for code formatting. Run before committing:

```bash
pnpm run format
```

Check formatting without modifying:

```bash
pnpm run format:check
```

### General Guidelines

- Use **TypeScript** for all new code
- Add **JSDoc comments** for public APIs
- Follow existing **naming conventions**
- Keep functions **small and focused**
- Write **tests** for new features

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new command
fix: resolve bug in snapshot
docs: update README
test: add tests for new feature
refactor: improve code structure
chore: update dependencies
```

## Testing

We use **Vitest** for testing.

### Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm run test:watch
```

### Writing Tests

- Place test files in `test/` directory
- Use `.test.ts` extension
- Follow the existing test patterns

Example:

```typescript
import { describe, it, expect } from 'vitest';

describe('MyFeature', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });
});
```

## Submitting a Pull Request

### Before Submitting

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes** following coding style guidelines

3. **Run tests**:
   ```bash
   pnpm test
   pnpm run typecheck
   pnpm run format:check
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add my feature"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/my-feature
   ```

### Create the Pull Request

1. Go to the [agent-browser repository](https://github.com/dextonai/agent-browser)
2. Click "New Pull Request"
3. Select "compare across forks"
4. Choose your fork and branch
5. Fill out the PR template

### PR Requirements

- ✅ Tests pass
- ✅ Code is formatted
- ✅ TypeScript compiles without errors
- ✅ PR description is clear
- ✅ Related issue is linked (if any)

### Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Once approved, a maintainer will merge

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for version management.

### Adding a Changeset

After making changes that affect the public API:

```bash
pnpm changeset
```

Follow the prompts to describe your changes.

### Version Bump

```bash
pnpm run ci:version
```

This updates the version number and changelog.

## Questions?

- Open a [Discussion](https://github.com/dextonai/agent-browser/discussions)
- Check existing [Issues](https://github.com/dextonai/agent-browser/issues)

Thank you for contributing! 🎉
