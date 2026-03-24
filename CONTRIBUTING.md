# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Environment Setup](#development-environment-setup)
- [Project Structure](#project-structure)
- [Coding Style Guidelines](#coding-style-guidelines)
- [Testing](#testing)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Code of Conduct

Be respectful and inclusive. We welcome contributions from everyone.

## Development Environment Setup

### Prerequisites

- **Node.js** 20 or 22 (LTS recommended)
- **pnpm** 9.x (package manager)
- **Rust** (latest stable, for native CLI development)
- **Git**

### Installation Steps

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```

2. **Install pnpm (if not already installed):**

   ```bash
   npm install -g pnpm
   ```

3. **Install project dependencies:**

   ```bash
   pnpm install
   ```

4. **Build the TypeScript code:**

   ```bash
   pnpm build
   ```

5. **Build the native Rust CLI (optional, for development):**

   ```bash
   # Install Rust from https://rustup.rs if not already installed
   pnpm build:native
   ```

6. **Install Playwright browsers for testing:**

   ```bash
   pnpm exec playwright install --with-deps chromium
   ```

### Verify Setup

Run the tests to ensure everything is working:

```bash
pnpm test
```

## Project Structure

```
agent-browser/
├── src/           # TypeScript source code (daemon, browser management)
├── cli/           # Rust CLI source code
├── bin/           # Platform-specific native binaries
├── dist/          # Compiled TypeScript output
├── test/          # Test files
├── docs/          # Documentation
├── scripts/       # Build and utility scripts
└── skills/        # AI agent skill files
```

- **src/**: Core TypeScript implementation including the browser daemon
- **cli/**: Rust CLI for fast command parsing
- **bin/**: Pre-built native binaries for each platform
- **dist/**: Compiled JavaScript output

## Coding Style Guidelines

### TypeScript

- Use **ESM modules** (type: "module" in package.json)
- Use **TypeScript strict mode** - ensure types are properly defined
- Use **async/await** for asynchronous operations
- Follow the existing code style in the project

### Code Formatting

We use **Prettier** for code formatting:

```bash
# Format all files
pnpm format

# Check formatting without modifying
pnpm format:check
```

### Type Checking

Always run type checking before submitting:

```bash
pnpm typecheck
```

### Rust

If modifying the Rust CLI:

- Follow standard Rust formatting (`cargo fmt`)
- Run `cargo clippy` for linting
- Ensure all tests pass: `cargo test --manifest-path cli/Cargo.toml`

### Commit Messages

Write clear, descriptive commit messages:

- Use the imperative mood ("Add feature" not "Added feature")
- Keep the first line under 72 characters
- Reference issues or PRs when relevant

Examples:
- `feat: add --timeout flag for commands`
- `fix: handle connection errors gracefully`
- `docs: update installation instructions`

## Testing

### Run All Tests

```bash
pnpm test
```

### Run Tests in Watch Mode

```bash
pnpm test:watch
```

### Rust Tests

```bash
cargo test --manifest-path cli/Cargo.toml
```

### Writing Tests

- Place test files in the `test/` directory
- Use **Vitest** as the test framework
- Write meaningful test descriptions
- Ensure new features have corresponding tests

## Submitting a Pull Request

### Before Submitting

1. **Create a feature branch:**

   ```bash
   git checkout -b my-feature
   ```

2. **Make your changes** following the coding style guidelines

3. **Run checks:**

   ```bash
   # Type checking
   pnpm typecheck

   # Formatting
   pnpm format:check

   # Tests
   pnpm test
   ```

4. **Commit your changes:**

   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

5. **Push to your fork:**

   ```bash
   git push origin my-feature
   ```

### Creating the PR

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select "compare across forks"
4. Choose your fork and branch
5. Fill out the PR template:
   - **Title**: Clear description of changes
   - **Description**: What and why you changed
   - **Related Issues**: Link any related issues

### PR Requirements

- All CI checks must pass
- Code must be properly formatted
- Type checking must pass
- Tests must pass
- No decrease in test coverage

### After Submitting

- Respond to review feedback promptly
- Keep your branch up to date with main:

  ```bash
  git fetch upstream
  git rebase upstream/main
  ```

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about contributing

Thank you for contributing to agent-browser!