# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- **Node.js** 18+ (we recommend using [nvm](https://github.com/nvm/nvm))
- **pnpm** 8+ (`npm install -g pnpm`)
- **Rust** (for native binary builds, see [rustup.rs](https://rustup.rs))
- **Chromium** (for local testing: `agent-browser install`)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/dextonai/agent-browser
cd agent-browser

# Install dependencies
pnpm install

# Build the project
pnpm build

# Build native binary (optional, requires Rust)
pnpm build:native

# Download Chromium browser
agent-browser install
```

### Development Workflow

```bash
# Run in development mode (auto-reload on changes)
pnpm dev

# Run tests
pnpm test

# Type-check without emitting files
pnpm typecheck

# Run linter
pnpm lint
```

## Project Structure

```
agent-browser/
├── bin/              # Entry point scripts
├── cli/              # Rust CLI source
├── dist/             # Compiled JavaScript output
├── docs/             # Documentation
├── scripts/          # Build and utility scripts
├── skills/           # Claude Code skill files
├── src/              # TypeScript source
│   ├── daemon.ts     # Browser daemon process
│   └── ...
├── test/             # Integration tests
└── package.json
```

## Coding Standards

### TypeScript

- Use **TypeScript** for all new source files
- Enable strict mode (`"strict": true` in tsconfig)
- Prefer explicit types over `any`
- Use `interface` for object shapes, `type` for unions/primitives

### Code Style

- **Formatting**: Prettier (auto-run via Husky pre-commit hook)
- **Linting**: ESLint (configured in `.eslintrc`)
- **Commits**: Conventional Commits format (`feat:`, `fix:`, `docs:`, etc.)

### Testing

- Add tests for new functionality
- Integration tests go in `test/`
- Run `pnpm test` before submitting PR

## Submitting Changes

### Pull Request Process

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/my-new-feature
   ```

2. **Make your changes** following the coding standards above.

3. **Test locally**:
   ```bash
   pnpm build
   pnpm test
   pnpm typecheck
   ```

4. **Commit** using Conventional Commits:
   ```bash
   git commit -m "feat: add new command for X"
   ```

5. **Push** to your fork:
   ```bash
   git push origin feat/my-new-feature
   ```

6. **Open a Pull Request** against `main` on the upstream repository.

### PR Guidelines

- Fill out the PR template completely
- Reference any related issues (`Closes #123`)
- For large changes, open an issue first to discuss
- Ensure CI passes (lint, typecheck, tests)

## Adding New Commands

agent-browser commands are implemented in `src/commands/`. Each command:

1. Is registered in the CLI argument parser
2. Has a corresponding handler function
3. Returns a consistent result object

Example command structure:
```typescript
// src/commands/my-command.ts
export async function myCommand(args: MyCommandArgs): Promise<CommandResult> {
  // implementation
  return { success: true, data: {} };
}
```

## Debugging

### Verbose Output

Use the `--debug` flag for verbose logging:

```bash
agent-browser open example.com --debug
```

### Daemon Logs

The daemon process logs to:
- `~/.agent-browser/logs/daemon.log` (file)
- stderr (console output in dev mode)

### Attaching to Running Browser

Use CDP mode to inspect a running browser:

```bash
# Start Chrome with remote debugging
google-chrome --remote-debugging-port=9222

# Connect
agent-browser connect 9222
```

## Releasing (Maintainers Only)

Releases are handled by the CI pipeline:

```bash
# Bump version (triggers release workflow)
npm version patch  # or minor, major

git push --follow-tags
```

The release workflow in `.github/workflows/release.yml` handles:
- Building for all platforms (Linux, macOS, Windows)
- Publishing to npm
- Creating GitHub releases

## Getting Help

- **Issues**: Open a [GitHub Issue](https://github.com/dextonai/agent-browser/issues)
- **Discussions**: Use [GitHub Discussions](https://github.com/dextonai/agent-browser/discussions)
- **Documentation**: Check the [README](README.md) first

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.
