# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This guide will help you get started.

## Development Setup

### Prerequisites

- **Node.js** 18+ (for the CLI wrapper and dashboard)
- **pnpm** (package manager) — install via `npm install -g pnpm`
- **Rust** (for the native binary) — install via https://rustup.rs
- **Chrome** — downloaded automatically via `agent-browser install`

### Getting Started

1. Fork and clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/agent-browser.git
cd agent-browser
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm build          # Build the Node.js wrapper
pnpm build:native   # Build the Rust binary (requires Rust toolchain)
```

4. Link globally for local development:

```bash
pnpm link --global
```

5. Download Chrome for Testing:

```bash
agent-browser install
```

## Package Manager

This project uses **pnpm**. Always use `pnpm` instead of `npm` or `yarn` for all package management tasks.

## Code Style

- Do not use emojis in code, output, or documentation. Unicode symbols are acceptable.
- CLI flags must always use **kebab-case** (e.g., `--auto-connect`). Never use camelCase for flags.
- CLI colored output should use `cli/src/color.rs`, which respects the `NO_COLOR` environment variable.
- Use param-case (kebab-case) for all file and folder names (e.g., `session-tree.tsx`).

### Linting and Formatting

This project uses **Prettier** for formatting. Run before committing:

```bash
pnpm prettier --write .
```

## Project Structure

- `cli/` — Rust CLI binary (browser automation daemon, CDP client, actions)
- `packages/dashboard/` — Next.js dashboard web app
- `src/` — Node.js CLI wrapper
- `docs/` — Documentation site (Next.js + MDX)
- `skills/` — AI agent skill definitions
- `scripts/` — Build and utility scripts
- `docker/` — Docker build configurations

## Making Changes

### Updating Documentation

When adding or changing user-facing features, update **all** of the following:

1. `cli/src/output.rs` — `--help` output
2. `README.md` — Options table and relevant sections
3. `skills/agent-browser/SKILL.md` — AI agent skill docs
4. `docs/src/app/` — Documentation site (MDX pages)
5. Inline doc comments in source files

In `docs/src/app/` MDX files, always use HTML `<table>` syntax (not markdown pipe tables).

### Dashboard Guidelines

- Never use native browser dialogs (`alert`, `confirm`, `prompt`). Use shadcn/ui components instead.
- Follow the existing shadcn/ui conventions in the `ui/` directory.

## Submitting a Pull Request

1. Create a feature branch from `main`:

```bash
git checkout -b fix/your-feature-name
```

2. Make your changes and commit:

```bash
git add .
git commit -m "description of your changes"
```

3. Push and create a PR:

```bash
git push origin fix/your-feature-name
```

4. In your PR description:
   - Describe what your changes do
   - Reference any related issues
   - Include testing instructions if applicable

## Running Tests

```bash
pnpm test
```

## Questions?

- Open a GitHub Issue for bugs or feature requests
- Check existing issues and PRs before creating new ones
