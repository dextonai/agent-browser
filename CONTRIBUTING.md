# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser. This guide covers everything you need to get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Environment Setup](#development-environment-setup)
- [Project Architecture](#project-architecture)
- [Coding Style Guidelines](#coding-style-guidelines)
- [Testing](#testing)
- [How to Submit a Pull Request](#how-to-submit-a-pull-request)
- [Versioning and Changesets](#versioning-and-changesets)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

Be respectful and constructive. We are committed to providing a welcoming and inclusive experience for everyone.

## Development Environment Setup

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | 20+ | TypeScript runtime and tooling |
| **pnpm** | 9+ | Package manager |
| **Rust** | stable | Native CLI binary (`rustup.rs`) |
| **Git** | 2.x+ | Version control |

### Getting Started

1. **Fork and clone the repository**

   ```bash
   gh repo fork dextonai/agent-browser --clone
   cd agent-browser
   ```

2. **Install Node.js dependencies**

   ```bash
   pnpm install
   ```

   This also sets up [Husky](https://typicode.github.io/husky/) git hooks via the `prepare` script.

3. **Build the TypeScript source**

   ```bash
   pnpm build
   ```

4. **Build the native Rust CLI** (optional, but recommended)

   ```bash
   pnpm build:native
   ```

   This compiles the Rust binary and copies it into `bin/`. If you skip this step, the Node.js fallback (`bin/agent-browser.js`) is used instead.

5. **Download Chromium**

   ```bash
   npx agent-browser install
   ```

   On Linux, add `--with-deps` to install system-level dependencies automatically.

6. **Verify your setup**

   ```bash
   pnpm typecheck      # Should pass with no errors
   pnpm format:check   # Should pass with no errors
   pnpm test           # Runs the full test suite
   ```

### Useful Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the daemon in dev mode (uses `tsx`) |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm build:native` | Compile Rust CLI for your platform |
| `pnpm typecheck` | Run `tsc --noEmit` type checking |
| `pnpm format` | Auto-format source files with Prettier |
| `pnpm format:check` | Check formatting without writing changes |
| `pnpm test` | Run the full test suite with Vitest |
| `pnpm test:watch` | Run tests in watch mode |

## Project Architecture

```
agent-browser/
  cli/           Rust CLI source (Cargo project)
    src/         Rust source files
  src/           TypeScript source
    daemon.ts    WebSocket daemon (main entry point)
    browser.ts   Playwright browser management
    actions.ts   Browser action implementations
    types.ts     Shared type definitions
  test/          Integration tests
  bin/           Compiled native binaries + JS fallback
  dist/          Compiled TypeScript output
  scripts/       Build and release helper scripts
  skills/        AI agent skill definitions
  docs/          Documentation site (Next.js)
```

The project has two runtime paths:

- **Rust CLI** (`cli/`) -- the primary entry point for performance-critical command parsing and dispatch.
- **Node.js daemon** (`src/`) -- the WebSocket-based Playwright automation server that the Rust CLI communicates with.

## Coding Style Guidelines

### General Rules

- **No emojis** in code, output, or documentation. Unicode symbols (`...`, `x`, `->`, `!`) are acceptable.
- Keep functions focused and files reasonably sized.
- Write descriptive variable and function names.

### TypeScript

- **Formatter:** [Prettier](https://prettier.io/) with the project configuration:
  - Semicolons: yes
  - Single quotes: yes
  - Trailing commas: ES5
  - Print width: 100
  - Tab width: 2
- **Strict mode** is enabled in `tsconfig.json`; do not use `@ts-ignore` without justification.
- Target **ES2022** with **NodeNext** module resolution.
- Tests live alongside source files (`src/**/*.test.ts`) or in `test/` for integration tests.

### Rust

- Follow standard `rustfmt` conventions.
- CLI flags must use **kebab-case** (e.g., `--auto-connect`, `--allow-file-access`). Never use camelCase for flags.
- Colored output must go through `cli/src/color.rs`, which respects the `NO_COLOR` environment variable. Do not use hardcoded ANSI codes.

### Commit Messages

- Use clear, imperative-mood messages (e.g., "Add snapshot retry logic", not "Added snapshot retry logic").
- Keep the subject line under 72 characters.
- Reference related issues where applicable (e.g., "Fix #123").

## Testing

### Running Tests

```bash
pnpm test              # Run all tests once
pnpm test:watch        # Run in watch mode during development
```

Tests use [Vitest](https://vitest.dev/) with a 30-second default timeout. Playwright browsers must be installed before running integration tests (`npx playwright install --with-deps chromium`).

### Writing Tests

- Unit tests go next to the source file: `src/foo.ts` -> `src/foo.test.ts`.
- Integration tests go in `test/`.
- Use descriptive test names that explain the expected behavior.
- Avoid flaky tests; if a test depends on timing, use appropriate retries or increased timeouts.

### What CI Checks

Every pull request runs the following checks (see `.github/workflows/ci.yml`):

1. **Version sync** -- ensures `package.json` and `Cargo.toml` versions match.
2. **TypeScript** -- type checking, format checking, and Vitest on Node 20 and 22.
3. **Rust** -- builds and tests on Linux, macOS (x64 + ARM), and Windows.
4. **Windows integration** -- end-to-end test of the install flow on Windows.
5. **Serverless Chromium** -- validates `@sparticuz/chromium` compatibility.
6. **Global install** -- tests `npm install -g` on all platforms.

All checks must pass before a PR can be merged.

## How to Submit a Pull Request

1. **Create a topic branch** from `main`:

   ```bash
   git checkout -b my-feature main
   ```

2. **Make your changes.** Follow the coding style guidelines above.

3. **Run the checks locally** before pushing:

   ```bash
   pnpm typecheck
   pnpm format:check
   pnpm test
   ```

   The pre-commit hook will run `lint-staged` (Prettier on staged `.ts` files) and sync the Cargo version automatically, so these should already be enforced.

4. **Add a changeset** if your change affects published behavior:

   ```bash
   pnpm changeset
   ```

   Select the change type (patch / minor / major) and write a short summary. The generated file should be committed with your PR.

5. **Push your branch and open a PR** against `main`:

   ```bash
   git push -u origin my-feature
   gh pr create --fill
   ```

6. **Respond to review feedback.** Maintainers may request changes; push follow-up commits to the same branch.

### PR Checklist

Before marking your PR as ready for review, verify:

- [ ] All CI checks pass (typecheck, format, tests, Rust build).
- [ ] New features include tests.
- [ ] Documentation is updated in **all** required locations (see the documentation list in `AGENTS.md`).
- [ ] A changeset is included if the change affects published behavior.
- [ ] The PR description clearly explains what changed and why.

## Versioning and Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation. When changesets are merged to `main`, an automated workflow creates a "Version Packages" PR. Merging that PR publishes to npm.

- **patch** -- bug fixes, documentation corrections.
- **minor** -- new features, non-breaking enhancements.
- **major** -- breaking changes to the CLI interface or public API.

## Reporting Issues

Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues) to report bugs or request features. Include:

- Steps to reproduce the problem.
- Expected vs. actual behavior.
- Your OS, Node.js version, and agent-browser version (`agent-browser --version`).
- Relevant logs or screenshots.

## Documentation Updates

When adding or changing user-facing features, update **all** of the following:

1. `cli/src/output.rs` -- `--help` output
2. `README.md` -- options table, feature sections, examples
3. `skills/agent-browser/SKILL.md` -- AI agent skill definitions
4. `docs/src/app/` -- Next.js documentation site
5. Inline doc comments in relevant source files

---

Thank you for contributing to agent-browser!
