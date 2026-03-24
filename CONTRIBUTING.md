# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Coding Style](#coding-style)
- [Submitting Changes](#submitting-changes)
- [Project Structure](#project-structure)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Development Setup

### Prerequisites

- **Node.js** 20.x or 22.x
- **pnpm** 9.x (package manager)
- **Rust** (latest stable) - for building the native CLI
- **Playwright** browsers (installed automatically)

### Getting Started

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Build the TypeScript code**

   ```bash
   pnpm build
   ```

4. **Build the native Rust CLI (optional)**

   ```bash
   pnpm build:native
   ```

   This requires Rust to be installed. See [rustup.rs](https://rustup.rs) for installation instructions.

5. **Install Playwright browsers**

   ```bash
   pnpm exec playwright install chromium
   ```

6. **Run tests**

   ```bash
   pnpm test
   ```

## Coding Style

We use [Prettier](https://prettier.io/) for code formatting. The configuration is defined in `.prettierrc`.

### Format your code

Before committing, format your code:

```bash
pnpm format
```

### Check formatting

To check if your code is properly formatted without modifying files:

```bash
pnpm format:check
```

This runs automatically in CI.

### TypeScript guidelines

- Use TypeScript strict mode
- Avoid `any` types when possible
- Add proper type annotations for function parameters and return types
- Use `interface` for object shapes, `type` for unions/intersections

### Rust guidelines

- Follow standard Rust formatting (`cargo fmt`)
- Run `cargo clippy` to catch common issues
- Add documentation comments (`///`) for public items

## Submitting Changes

### Pull Request Process

1. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Write clear, descriptive commit messages
   - Keep commits focused and atomic
   - Add tests for new functionality

3. **Run checks locally**

   ```bash
   # Type check
   pnpm typecheck

   # Format check
   pnpm format:check

   # Run tests
   pnpm test

   # Rust tests (if modifying native CLI)
   cargo test --manifest-path cli/Cargo.toml
   ```

4. **Push and create PR**

   ```bash
   git push origin feature/your-feature-name
   ```

   Then open a Pull Request on GitHub.

### PR Guidelines

- **Title**: Clear and descriptive (e.g., "feat: add new command for X" or "fix: resolve issue with Y")
- **Description**: Explain what changes you made and why
- **Tests**: Include tests for new features or bug fixes
- **Documentation**: Update docs if adding new features or changing behavior

### Commit Message Format

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add --annotate flag for screenshot command
fix: resolve timeout issue in snapshot command
docs: update README with iOS simulator instructions
```

## Project Structure

```
agent-browser/
├── src/              # TypeScript source code
│   ├── daemon.ts     # Main daemon process
│   ├── browser.ts    # Browser management
│   └── ...
├── cli/              # Rust CLI source
│   ├── src/          # Rust source files
│   └── Cargo.toml    # Rust dependencies
├── bin/              # Pre-built binaries
├── test/             # Test files
├── scripts/          # Build and utility scripts
├── docs/             # Documentation
└── skills/           # AI assistant skills
```

## Questions?

Feel free to open an issue for questions or discussions. We're happy to help!

---

Thank you for contributing to agent-browser! 🎉