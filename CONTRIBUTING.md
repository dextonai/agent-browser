# Contributing to agent-browser

Thanks for your interest in contributing! This guide covers everything you need to get started.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or v22
- [pnpm](https://pnpm.io/) v9+
- [Rust](https://rustup.rs/) (optional, only needed for native binary builds)

### Getting Started

1. **Fork and clone the repo:**

   ```bash
   git clone https://github.com/<your-username>/agent-browser.git
   cd agent-browser
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Build the project:**

   ```bash
   pnpm build
   ```

4. **Link for local development:**

   ```bash
   pnpm link --global
   agent-browser install  # Download Chromium
   ```

5. **Run the type checker:**

   ```bash
   pnpm typecheck
   ```

6. **Run tests:**

   ```bash
   pnpm test
   ```

### Rust Native Binary (optional)

If you want to build the native Rust CLI:

```bash
pnpm build:native
```

## Coding Style

- **TypeScript:** Code is written in TypeScript with strict typing enabled. Run `pnpm typecheck` to verify.
- **Formatting:** We use Prettier. Run `pnpm format:check` before committing.
  - Auto-fix with: `pnpm format`
- **Linting:** Follow existing patterns in the codebase. Keep functions small and focused.
- **Naming:** Use `camelCase` for variables/functions, `PascalCase` for types/interfaces, `kebab-case` for file names.
- **Exports:** Prefer named exports over default exports.

## How to Submit a PR

1. **Create a branch** from `main`:

   ```bash
   git checkout -b your-branch-name
   ```

2. **Make your changes.** Keep commits focused and messages clear.

3. **Run checks locally** before pushing:

   ```bash
   pnpm typecheck
   pnpm format:check
   pnpm test
   ```

4. **Push and open a PR** against `main` on GitHub.

5. **In your PR description:**
   - Describe what the change does and why
   - Reference any related issues (e.g., `Fixes #1`)
   - Include screenshots/terminal output if relevant

6. **CI must pass.** The CI workflow runs type checks, formatting, and tests on Node 20 and 22.

### PR Guidelines

- Keep PRs small and focused on a single change
- Update `CHANGELOG.md` if the change is user-facing
- Add tests for new functionality when possible
- Make sure `pnpm format` has been run (no trailing whitespace, consistent style)

## Reporting Issues

- Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues) to report bugs
- Include your OS, Node.js version, and agent-browser version
- Provide steps to reproduce the issue

## License

By contributing, you agree that your contributions will be licensed under the [Apache-2.0 License](LICENSE).
