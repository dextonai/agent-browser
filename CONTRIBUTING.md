# Contributing to agent-browser

Thanks for your interest in contributing! This guide covers everything you need to get started.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or v22
- [pnpm](https://pnpm.io/) v9+
- [Rust](https://rustup.rs/) (stable toolchain)
- [Playwright](https://playwright.dev/) (installed automatically via pnpm)

### Clone & Install

```bash
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
pnpm install
```

### Build

```bash
# Build TypeScript
pnpm build

# Build Rust CLI
cargo build --release --manifest-path cli/Cargo.toml
```

### Run Tests

```bash
# TypeScript tests
pnpm test

# Rust tests
cargo test --manifest-path cli/Cargo.toml

# Type checking
pnpm typecheck

# Format check
pnpm format:check
```

## Coding Style

### TypeScript

- Follow the existing code style enforced by [Prettier](https://prettier.io/)
- Run `pnpm format:check` before committing
- Use strict TypeScript — no `any` unless absolutely necessary

### Rust

- Follow `rustfmt` defaults (configured in `.rustfmt.toml`)
- Run `cargo fmt --check` and `cargo clippy` before committing

## Submitting a PR

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature
   ```

2. **Make your changes** and ensure all checks pass:
   ```bash
   pnpm typecheck
   pnpm format:check
   pnpm test
   cargo test --manifest-path cli/Cargo.toml
   ```

3. **Commit** with a clear, descriptive message:
   ```bash
   git commit -m "feat: add support for XYZ"
   ```

4. **Push** and open a Pull Request against `main`.

5. **Fill out the PR template** — describe what changed and why.

### PR Guidelines

- Keep PRs focused — one feature or fix per PR
- Add tests for new functionality
- Update documentation if behavior changes
- Ensure CI passes before requesting review

## Reporting Issues

Open an issue on [GitHub Issues](https://github.com/dextonai/agent-browser/issues) with:

- A clear title and description
- Steps to reproduce (if a bug)
- Expected vs actual behavior
- Environment details (OS, Node version, Rust version)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
