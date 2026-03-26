# Contributing to agent-browser

Thanks for your interest in contributing! This guide will help you get started.

## Dev Environment Setup

### Prerequisites

- **Node.js** 18 or later
- **pnpm** (install via `npm install -g pnpm`)
- **Rust** (optional, only needed for native binary builds): [rustup.rs](https://rustup.rs)

### Steps

1. **Fork** the repository on GitHub.

2. **Clone** your fork:

   ```bash
   git clone https://github.com/<your-username>/agent-browser.git
   cd agent-browser
   ```

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Build the TypeScript source:**

   ```bash
   pnpm build
   ```

5. **(Optional) Build the native Rust CLI:**

   ```bash
   pnpm build:native
   ```

6. **Link locally for testing:**

   ```bash
   pnpm link --global
   agent-browser install   # Download Chromium
   ```

7. **Run tests** to verify everything works:

   ```bash
   pnpm test
   ```

8. **Run in dev mode** (uses tsx for live TypeScript execution):

   ```bash
   pnpm dev
   ```

### Linux System Dependencies

On Linux, Chromium requires extra system libraries:

```bash
agent-browser install --with-deps
# or manually:
npx playwright install-deps chromium
```

## Coding Style

- **Formatter:** [Prettier](https://prettier.io) — run `pnpm format` before committing.
- **Lint check:** `pnpm format:check` to verify formatting without writing.
- **TypeScript strict mode** is enabled — run `pnpm typecheck` to catch type errors.
- **Commit style:** Use clear, descriptive commit messages. Prefix with the area of change when relevant (e.g., `cli:`, `docs:`, `fix:`, `feat:`).
- Keep changes focused — one logical change per PR.

## How to Submit a PR

1. **Create a branch** from `main`:

   ```bash
   git checkout -b your-branch-name
   ```

2. **Make your changes** and ensure they pass:

   ```bash
   pnpm format:check
   pnpm typecheck
   pnpm test
   ```

3. **Commit** with a clear message:

   ```bash
   git commit -m "feat: add support for X"
   ```

4. **Push** to your fork:

   ```bash
   git push origin your-branch-name
   ```

5. **Open a Pull Request** against `dextonai/agent-browser:main`:
   - Describe **what** you changed and **why**.
   - Reference any related issues (e.g., `Closes #123`).
   - If your PR relates to a bounty, include the bounty reference in the PR body.

## Running Tests

```bash
pnpm test          # Single run
pnpm test:watch    # Watch mode for development
```

## Project Structure

```
agent-browser/
├── src/            # TypeScript source (daemon, CLI wrapper)
├── cli/            # Rust CLI source (Cargo project)
├── bin/            # Compiled native binaries
├── scripts/        # Build and release scripts
├── docs/           # Documentation
├── test/           # Vitest test files
└── docker/         # Docker build configs for cross-platform builds
```

## Reporting Issues

- Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues) to report bugs or request features.
- Include your OS, Node.js version, and steps to reproduce.

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).
