# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This guide will help you get started.

## Development Setup

### Prerequisites

- **Node.js** ≥ 18
- **Rust** (latest stable) — for native CLI builds
- **Chromium** — downloaded via `agent-browser install`

### Getting Started

```bash
# Clone the repository
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser

# Install dependencies
npm install

# Download Chromium (required for tests)
npx agent-browser install

# Build the project
npm run build
```

### Running Tests

```bash
npm test
```

## Coding Style

- **TypeScript** — all Node.js source lives in `src/` and must type-check cleanly
- **Rust** — native CLI code follows standard `rustfmt` formatting (`cargo fmt`)
- Use **meaningful variable names** and keep functions focused
- Add **JSDoc / doc comments** for public APIs
- Run `npm run lint` (if available) before submitting

## How to Submit a Pull Request

1. **Fork** the repository on GitHub
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
3. **Make your changes** — keep commits atomic and descriptive
4. **Test** your changes locally
5. **Push** to your fork:
   ```bash
   git push origin feat/my-feature
   ```
6. **Open a Pull Request** against `dextonai/agent-browser:main`
   - Describe what you changed and why
   - Reference any related issues (e.g., `Fixes #123`)

## Reporting Issues

- Search existing issues before opening a new one
- Include steps to reproduce, expected vs. actual behavior, and your environment info

## Code of Conduct

Be respectful. We're all here to build something useful.

## License

By contributing, you agree that your contributions will be licensed under the [Apache 2.0 License](LICENSE).
