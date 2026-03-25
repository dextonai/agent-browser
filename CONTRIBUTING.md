# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This guide will help you get started.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Style](#coding-style)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/agent-browser.git
   cd agent-browser
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Download Chromium** (required for browser tests):

   ```bash
   npx agent-browser install
   ```

## Development Setup

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended package manager)
- **Rust** toolchain (for native CLI builds — optional for JS-only changes)

### Common Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the project |
| `pnpm test` | Run the test suite |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm typecheck` | Run TypeScript type checks |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |

### Native CLI (Rust)

To build the native Rust CLI:

```bash
pnpm build:native
```

Platform-specific builds:

```bash
pnpm build:linux
pnpm build:macos
pnpm build:windows
```

## Coding Style

- **TypeScript** for all source code in `src/`.
- **Prettier** for formatting — run `pnpm format` before committing.
- **Type safety** — avoid `any`; use proper types. Run `pnpm typecheck` to verify.
- **Tests** — add tests for new features in `test/`. We use [Vitest](https://vitest.dev/).
- Keep functions small and focused. Prefer composition over inheritance.

## Submitting a Pull Request

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feat/your-feature
   ```

2. Make your changes and commit with clear messages:

   ```bash
   git commit -m "feat: add XYZ support"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/).

3. Run checks before pushing:

   ```bash
   pnpm format
   pnpm typecheck
   pnpm test
   ```

4. Push to your fork and open a Pull Request against `main`.

5. Describe your changes clearly in the PR description. Reference any related issues.

### PR Guidelines

- Keep PRs focused — one feature or fix per PR.
- Include tests for new functionality.
- Update documentation if behavior changes.
- Be responsive to review feedback.

## Reporting Issues

- Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues) to report bugs or request features.
- Include reproduction steps, expected vs. actual behavior, and your environment (OS, Node version).

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
