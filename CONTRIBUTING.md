# Contributing to agent-browser

Thanks for your interest in contributing to agent-browser! This guide will help you get set up and submit your first PR.

## Development Setup

### Prerequisites

- **Node.js** >= 20
- **pnpm** (package manager)
- **Rust** (optional, for native CLI binary — install via [rustup.rs](https://rustup.rs))

### Getting Started

```bash
# Clone the repository
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser

# Install dependencies
pnpm install

# Build the TypeScript source
pnpm build

# (Optional) Build the native Rust CLI for maximum performance
pnpm build:native
```

### Running Locally

```bash
# Start the daemon in development mode (with hot reload)
pnpm dev

# Or run the built version
pnpm start
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode during development
pnpm test:watch
```

## Coding Style

This project uses **Prettier** for code formatting and **TypeScript** for type safety.

```bash
# Check formatting
pnpm format:check

# Auto-fix formatting
pnpm format

# Type-check without emitting
pnpm typecheck
```

### Style Guidelines

- Use TypeScript for all source files in `src/`
- Follow the existing code patterns and naming conventions
- Keep functions focused and well-documented
- Use descriptive variable names
- Add JSDoc comments for public APIs

## Project Structure

```
agent-browser/
├── src/           # TypeScript source (daemon, commands, providers)
├── cli/           # Rust CLI source (native binary)
├── bin/           # CLI entry point and native binaries
├── dist/          # Compiled output
├── test/          # Test files (Vitest)
├── docs/          # Documentation
├── skills/        # AI agent skill definitions
├── scripts/       # Build and utility scripts
└── docker/        # Docker build configs
```

## Submitting a Pull Request

1. **Fork** the repository and create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** and ensure:
   - Code compiles: `pnpm build`
   - Tests pass: `pnpm test`
   - Formatting is correct: `pnpm format:check`
   - Types are valid: `pnpm typecheck`

3. **Add a changeset** if your change affects the public API or behavior:
   ```bash
   pnpm changeset
   ```
   Follow the prompts to describe your change and select the semver bump type.

4. **Commit** with a clear message following [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add new snapshot filter option
   fix: resolve timeout issue with CDP connections
   docs: update README with new examples
   ```

5. **Push** and open a Pull Request against `main`.

## Types of Contributions

- **Bug fixes** — Fix issues and add regression tests
- **Features** — New commands, providers, or integrations
- **Documentation** — Improve README, add examples, fix typos
- **Tests** — Increase test coverage
- **Performance** — Optimize the daemon or CLI

## Need Help?

- Check existing [issues](https://github.com/dextonai/agent-browser/issues) for context
- Open a new issue if you find a bug or have a feature request
- Read the [README](./README.md) for full command reference

## License

By contributing, you agree that your contributions will be licensed under the [Apache-2.0 License](./LICENSE).
