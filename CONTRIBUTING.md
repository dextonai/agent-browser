# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document provides guidelines for contributing to the project.

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Coding Style Guidelines](#coding-style-guidelines)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Development Environment Setup

### Prerequisites

- **Node.js** >= 20.x
- **pnpm** >= 9.x (package manager)
- **Rust** >= 1.70 (for native CLI)
- **Git**

### Installation

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Install Playwright browsers:
   ```bash
   pnpm exec playwright install --with-deps chromium
   ```

5. Build the TypeScript:
   ```bash
   pnpm build
   ```

6. (Optional) Build the Rust CLI:
   ```bash
   pnpm run build:native
   ```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run Rust tests only
cargo test --manifest-path cli/Cargo.toml
```

### Running the Development Server

```bash
pnpm dev
```

## Coding Style Guidelines

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow the existing code style (enforced by Prettier)
- Run `pnpm format` before committing
- Run `pnpm typecheck` to ensure type safety

### Rust

- Follow standard Rust formatting (`cargo fmt`)
- Run `cargo clippy` to catch common mistakes
- Ensure all tests pass: `cargo test`

### General

- Write clear, descriptive commit messages
- Add tests for new functionality
- Update documentation as needed
- Keep changes focused and atomic

## Submitting a Pull Request

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding guidelines above

3. **Test your changes**:
   ```bash
   pnpm test
   pnpm typecheck
   pnpm format:check
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template with:
     - Clear description of changes
     - Related issue numbers (if applicable)
     - Testing performed

7. **Wait for review** - maintainers will review your PR and provide feedback

### PR Checklist

- [ ] Tests pass (`pnpm test`)
- [ ] TypeScript compiles without errors (`pnpm typecheck`)
- [ ] Code is formatted (`pnpm format`)
- [ ] Commit messages are clear and descriptive
- [ ] Documentation is updated (if needed)

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about contributing

Thank you for contributing!
