# Contributing to agent-browser

Thanks for your interest in contributing! This guide covers everything you need to get started.

## Prerequisites

- **Node.js** >= 20
- **pnpm** (install via `corepack enable` or `npm i -g pnpm`)
- **Rust** (optional, only needed for native CLI builds — install via [rustup](https://rustup.rs))

## Dev Environment Setup

1. **Fork and clone:**

```bash
git clone https://github.com/<your-username>/agent-browser.git
cd agent-browser
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Install Chromium (for running tests):**

```bash
npx agent-browser install
```

4. **Verify everything works:**

```bash
pnpm test
pnpm typecheck
```

## Project Structure

```
agent-browser/
├── src/              # TypeScript source (daemon, actions, protocol, etc.)
├── cli/              # Rust CLI (optional native binary)
├── dist/             # Compiled output (gitignored)
├── scripts/          # Build & version sync helpers
├── docker/           # Cross-compilation Docker configs
├── test/             # Test utilities
├── bin/              # Pre-built native binaries
└── docs/             # Additional documentation
```

## Coding Style

- **TypeScript** with strict mode (`"strict": true` in tsconfig)
- **Formatting:** Prettier — run `pnpm format` before committing
- **Lint check:** `pnpm format:check` ensures your code matches the style
- **Naming:**
  - `camelCase` for variables and functions
  - `PascalCase` for classes and types
  - `kebab-case` for filenames
- **Imports:** Use `import` (ESM), not `require`

## Running Tests

```bash
pnpm test           # Run all tests once
pnpm test:watch     # Run tests in watch mode
pnpm typecheck      # TypeScript type checking
```

Tests use [Vitest](https://vitest.dev/). Test files live alongside source files as `*.test.ts`.

## Making Changes

1. **Create a branch:**

```bash
git checkout -b feat/my-feature
# or fix/my-bug
```

2. **Make your changes** following the coding style above.

3. **Run checks before committing:**

```bash
pnpm format         # Auto-format
pnpm typecheck      # Verify types
pnpm test           # Run tests
```

4. **Commit with a clear message:**

```bash
git commit -m "feat: add support for X"
# or "fix: resolve issue with Y"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, etc.).

## Submitting a PR

1. Push your branch to your fork.
2. Open a Pull Request against `main`.
3. Fill in the PR description — explain **what** and **why**.
4. Ensure CI passes (lint, typecheck, tests).
5. Wait for review. Be responsive to feedback.

## Adding CLI Commands

If you're adding a new subcommand:

1. Add the action handler in `src/actions.ts`
2. Register it in the Rust CLI under `cli/src/main.rs` (if targeting native)
3. Add tests in `src/actions.test.ts`
4. Update `README.md` with usage examples

## Reporting Issues

- Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues/new)
- Include: OS, Node.js version, steps to reproduce, expected vs actual behavior
- For security issues, email security@dextonhub.com instead of opening a public issue

## License

By contributing, you agree that your contributions will be licensed under the same license as the project ([LICENSE](./LICENSE)).
