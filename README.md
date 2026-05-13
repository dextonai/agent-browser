# CONTRIBUTING.md

## Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document provides guidelines and instructions for contributing to the project.

## Development Environment Setup

### Prerequisites

- **Rust** (stable, latest version) - Install via [rustup](https://rustup.rs/)
- **Node.js** (v16 or later) - Required for npm package integration
- **Git**

### Clone and Build

```bash
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
cargo build
```

### Run Tests

```bash
cargo test
```

### Install Chrome for Testing (Development)

```bash
cargo run -- install
```

## Coding Style Guidelines

### Rust Code

- Follow the [Rust Style Guide](https://doc.rust-lang.org/1.0.0/style/README.html) and use `rustfmt` for formatting.
- Run `cargo fmt` before committing.
- Run `cargo clippy` to catch common mistakes and improve code quality.
- Use meaningful variable and function names.
- Write documentation comments (`///`) for public APIs.

### Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally after the first line.

## How to Submit a Pull Request

1. **Fork the repository** on GitHub.
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Make your changes** following the coding style guidelines.
4. **Test your changes**:
   ```bash
   cargo test
   cargo clippy
   cargo fmt --check
   ```
5. **Commit your changes** with a clear commit message.
6. **Push to your fork**:
   ```bash
   git push origin feature/my-feature
   ```
7. **Open a pull request** against the `main` branch of the original repository.
   - Provide a clear title and description.
   - Reference any related issues.
   - Include steps to test the changes.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating in this project, you agree to abide by its terms.

---

# README.md (Updated with Badge)

```markdown
# agent-browser

[![Build Status](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml)
[![Crates.io](https://img.shields.io/crates/v/agent-browser.svg)](https://crates.io/crates/agent-browser)
[![npm](https://img.shields.io/npm/v/agent-browser.svg)](https://www.npmjs.com/package/agent-browser)

Browser automation CLI for AI agents. Fast native Rust CLI.

## Installation

### Global Installation (recommended)

Installs the native Rust binary:

```bash
npm install -g agent-browser
agent-browser install  # Download Chrome from Chrome for Testing (first time only)
```

### Project Installation (local dependency)

For projects that want to pin the version in `package.json`:

```bash
npm install agent-browser
agent-browser install
```

Then use via `package.json` scripts or by invoking `agent-browser` directly.

### Homebrew (macOS)

```bash
brew install agent-browser
agent-browser install  # Download Chrome from Chrome for Testing (first time only)
```

### Cargo (Rust)

```bash
cargo install agent-browser
agent-browser install  # Download Chrome from Chrome for Testing (first time only)
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

[License information to be added]
```