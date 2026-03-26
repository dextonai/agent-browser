# Contributing to agent-browser

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- **Node.js** >= 18
- **pnpm** (install via `npm install -g pnpm`)
- **Rust** (optional, only needed for native binary builds): [rustup.rs](https://rustup.rs)

### Getting Started

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/agent-browser.git
   cd agent-browser
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Build the TypeScript daemon:**

   ```bash
   pnpm build
   ```

4. **Build the native Rust CLI (optional, requires Rust):**

   ```bash
   pnpm build:native
   ```

5. **Link for local development:**

   ```bash
   pnpm link --global
   agent-browser install  # Download Chromium
   ```

6. **Run in dev mode (auto-reloads TypeScript):**

   ```bash
   pnpm dev
   ```

### Running Tests

```bash
pnpm test            # Run tests once
pnpm test:watch      # Run tests in watch mode
```

### Type Checking

```bash
pnpm typecheck
```

## Coding Style

- **Formatter:** [Prettier](https://prettier.io/) — run `pnpm format` before committing.
- **Lint-staged:** Prettier runs automatically on staged `.ts` files via Husky + lint-staged.
- **TypeScript strict mode** is enabled. Avoid `any` unless absolutely necessary.
- **Naming conventions:**
  - `camelCase` for variables and functions
  - `PascalCase` for classes and types
  - `kebab-case` for file names
- **Keep functions small** and focused. Extract helpers when logic grows beyond ~30 lines.

## Project Structure

```
agent-browser/
├── src/            # TypeScript daemon (WebSocket server, Playwright bridge)
├── cli/            # Rust CLI source (Cargo project)
├── bin/            # Platform binaries and entry point scripts
├── dist/           # Compiled TypeScript output (committed)
├── scripts/        # Build and release scripts
├── test/           # Test files
├── docs/           # Documentation site (Next.js)
├── docker/         # Docker build configs for cross-platform builds
└── skills/         # AI agent skill definitions
```

## Submitting a PR

1. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feat/my-feature
   ```

2. **Make your changes.** Follow the coding style above.

3. **Run checks locally:**

   ```bash
   pnpm typecheck
   pnpm test
   pnpm format:check
   ```

4. **Commit with a clear message:**

   ```bash
   git commit -m "feat: add support for X"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` — new features
   - `fix:` — bug fixes
   - `docs:` — documentation changes
   - `refactor:` — code refactoring (no behavior change)
   - `test:` — adding or updating tests
   - `chore:` — build, tooling, or dependency updates

5. **Push and open a PR** against the `main` branch:

   ```bash
   git push origin feat/my-feature
   ```

6. **PR description:** Clearly describe what changed and why. Link any related issues.

### PR Checklist

- [ ] Code compiles (`pnpm build`)
- [ ] Tests pass (`pnpm test`)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Formatting is clean (`pnpm format:check`)
- [ ] PR description explains the change

## Reporting Issues

- Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues) for bugs and feature requests.
- Include: OS, Node.js version, agent-browser version, and reproduction steps.

## License

By contributing, you agree that your contributions will be licensed under the [Apache-2.0 License](LICENSE).
