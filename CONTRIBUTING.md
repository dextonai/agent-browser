# Contributing to agent-browser

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- Rust 1.75+ (install via [rustup](https://rustup.rs))
- Node.js 18+ (for npm integration)
- Chrome or Chrome for Testing

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

### Run Locally

```bash
cargo run -- --help
```

## Project Structure

```
src/
  main.rs          # CLI entry point
  browser/         # Browser automation core
  protocol/        # CDP protocol handling
  commands/        # CLI command implementations
```

## Coding Style

- Follow standard Rust conventions (`rustfmt` + `clippy`)
- Use `cargo fmt` before committing
- Run `cargo clippy -- -D warnings` to catch lint issues
- Write descriptive commit messages
- Add tests for new functionality

## Submitting a Pull Request

1. Fork the repository
2. Create a feature branch: `git checkout -b my-feature`
3. Make your changes
4. Run `cargo fmt` and `cargo clippy`
5. Run `cargo test` to ensure all tests pass
6. Commit with a descriptive message
7. Push to your fork: `git push origin my-feature`
8. Open a Pull Request against `main`

## Reporting Issues

- Use GitHub Issues for bugs and feature requests
- Include steps to reproduce for bugs
- Include your OS, Rust version, and Node.js version

## Code of Conduct

Be respectful and constructive in all interactions.
