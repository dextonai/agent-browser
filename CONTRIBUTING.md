# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This guide will help you get started.

## Development Setup

### Prerequisites

- **Node.js** 18+ and **pnpm** (package manager)
- **Rust** (latest stable) — install via [rustup.rs](https://rustup.rs)
- **Git**

### Getting Started

```bash
# Clone the repository
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser

# Install dependencies
pnpm install

# Build the project
pnpm build

# Build the native Rust binary
pnpm build:native

# Link globally for local development
pnpm link --global
```

### Running Tests

```bash
pnpm test
```

## Coding Style

- **TypeScript/JavaScript**: Follow the existing code style. Prettier is configured — run `pnpm format` before committing.
- **Rust**: Follow standard Rust conventions (`cargo fmt`, `cargo clippy`).
- **Commits**: Use clear, descriptive commit messages.

## How to Submit a PR

1. **Fork** the repository and create a feature branch from `main`.
2. **Make your changes** with clear, focused commits.
3. **Test** your changes locally.
4. **Open a Pull Request** against the `main` branch of `dextonai/agent-browser`.
5. Include a clear description of what the PR does and reference any related issues.

### PR Guidelines

- Keep PRs focused — one feature or fix per PR.
- Add tests for new functionality when applicable.
- Update documentation (README, inline docs) if your change affects the user-facing API.

## Reporting Issues

- Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues) to report bugs or request features.
- Include steps to reproduce, expected behavior, and actual behavior.

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 license.
