# Contributing to agent-browser

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [Rust](https://rustup.rs/) (optional, for building the native CLI)

### Clone and Install

```bash
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
pnpm install
```

### Build

```bash
pnpm build            # Build the Node.js package
pnpm build:native     # Build the native Rust CLI (requires Rust toolchain)
```

### Run Tests

```bash
pnpm test             # Run the test suite
```

### Link Locally for Testing

```bash
pnpm link --global    # Makes `agent-browser` available globally from your local build
agent-browser install  # Download Chromium for testing
```

## Coding Style

- **TypeScript**: Follow the existing code style. Use `eslint` and `prettier` configurations provided in the repo.
- **Rust**: Use `cargo fmt` and `cargo clippy` before submitting.
- **Naming**: Use descriptive names. Prefer clarity over brevity.
- **Comments**: Add comments for non-obvious logic. Avoid commenting obvious code.
- **Error handling**: Always handle errors explicitly. Avoid silent failures.

### Linting

```bash
pnpm lint             # Check for lint issues
pnpm lint --fix       # Auto-fix where possible
```

### Formatting

```bash
pnpm format           # Run prettier
```

## How to Submit a PR

1. **Fork** the repository and create a new branch from `main`:

   ```bash
   git checkout -b feat/my-feature
   ```

2. **Make your changes.** Keep commits focused and atomic.

3. **Run tests and lint** before committing:

   ```bash
   pnpm test
   pnpm lint
   ```

4. **Commit** with a clear, descriptive message:

   ```bash
   git commit -m "feat: add snapshot diff command"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code refactoring
   - `test:` for adding or updating tests
   - `chore:` for maintenance tasks

5. **Push** your branch and open a Pull Request against `main`.

6. **Fill in the PR template** with:
   - A clear description of what the PR does
   - Any related issues (e.g., `Closes #123`)
   - Screenshots or examples if applicable

7. **Wait for CI** to pass. Fix any failures before requesting review.

## Reporting Issues

- Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues) to report bugs or request features.
- Include steps to reproduce, expected behavior, and actual behavior.
- Mention your OS, Node.js version, and agent-browser version.

## License

By contributing, you agree that your contributions will be licensed under the [Apache-2.0 License](LICENSE).
