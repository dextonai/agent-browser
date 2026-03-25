# Contributing to agent-browser

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Table of Contents

- [Development Setup](#development-setup)
- [Coding Style](#coding-style)
- [Submitting a PR](#submitting-a-pr)
- [Reporting Issues](#reporting-issues)

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v8+
- [Rust](https://rustup.rs/) (for native CLI development)

### Getting Started

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/agent-browser
   cd agent-browser
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Download Chromium:

   ```bash
   pnpm exec agent-browser install
   ```

4. Build the project:

   ```bash
   pnpm build
   pnpm build:native   # optional: builds the Rust CLI (requires Rust)
   ```

5. Run tests:

   ```bash
   pnpm test
   ```

## Coding Style

- **TypeScript**: All new code should be written in TypeScript with strict types.
- **Formatting**: Code is formatted with [Prettier](https://prettier.io/). Run `pnpm format` before committing.
- **Linting**: Run `pnpm lint` and fix any errors before opening a PR.
- **Commit messages**: Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `fix:`, `feat:`, `docs:`, `chore:`).
- **Tests**: Add or update tests for any behavior you change. Tests live in the `test/` directory and use [Vitest](https://vitest.dev/).

## Submitting a PR

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes, then ensure the build and tests pass:

   ```bash
   pnpm build && pnpm test
   ```

3. Push your branch and open a pull request against `dextonai/agent-browser:main`.

4. Fill in the PR template and link any related issues (e.g. `Closes #123`).

5. A maintainer will review your PR. Please respond to feedback promptly and keep the branch up to date with `main`.

### PR Checklist

- [ ] Code builds without errors (`pnpm build`)
- [ ] Tests pass (`pnpm test`)
- [ ] Code is formatted (`pnpm format`)
- [ ] Commit messages follow Conventional Commits
- [ ] Relevant documentation is updated

## Reporting Issues

Please [open an issue](https://github.com/dextonai/agent-browser/issues/new) with a clear description, steps to reproduce, and your environment details (OS, Node version, package version).

---

We appreciate every contribution, no matter how small. Happy hacking!
