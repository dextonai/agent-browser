# Contributing to agent-browser

Thank you for your interest in contributing to **agent-browser**! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Style](#coding-style)
- [Making Changes](#making-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive experience for everyone.

## Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **pnpm** (v8 or later)
- **Rust** (latest stable) — required for building the native CLI binary
- **Git**

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/agent-browser.git
cd agent-browser
```

3. Add the upstream remote:

```bash
git remote add upstream https://github.com/dextonai/agent-browser.git
```

## Development Setup

1. Install dependencies:

```bash
pnpm install
```

2. Build the native CLI binary:

```bash
pnpm build:native
```

3. Link the binary globally for testing:

```bash
pnpm link --global
agent-browser install
```

4. Run the dashboard (if working on the UI):

```bash
cd packages/dashboard
pnpm build
```

## Project Structure

```
agent-browser/
├── cli/              # Rust CLI source code (the native binary)
├── src/              # JavaScript/TypeScript wrapper and daemon
├── packages/         # Sub-packages (dashboard, etc.)
├── bin/              # Compiled binaries and JS entry points
├── scripts/          # Build and release scripts
├── skills/           # Skill definitions for AI agent integration
├── docker/           # Docker build configurations
├── docs/             # Documentation
└── examples/         # Usage examples
```

## Coding Style

### Rust (CLI)

- Follow the [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/)
- Use `cargo fmt` to format code
- Run `cargo clippy` and fix all warnings before submitting
- Write doc comments for public functions and modules

### TypeScript/JavaScript

- Use **ES modules** (`"type": "module"` in package.json)
- Follow the existing code style (2-space indentation, single quotes)
- Use `prettier` for formatting if configured
- Prefer `async/await` over raw promises
- Use descriptive variable names

### General

- Keep commits focused and atomic — one logical change per commit
- Write clear commit messages: what changed and why
- Do not commit generated files (`dist/`, `bin/agent-browser-*`)

## Making Changes

### Branch Naming

Create a descriptive branch from `main`:

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/issue-description
```

Common prefixes:
- `feat/` — new features
- `fix/` — bug fixes
- `docs/` — documentation changes
- `refactor/` — code refactoring
- `test/` — adding or updating tests

### Testing

Before submitting, verify your changes:

1. **Build the native binary:**

```bash
pnpm build:native
```

2. **Test basic CLI commands:**

```bash
agent-browser open example.com
agent-browser snapshot
agent-browser close
```

3. **Check version sync:**

```bash
node scripts/check-version-sync.js
```

4. **Test the install flow:**

```bash
agent-browser install
```

## Submitting a Pull Request

1. **Sync with upstream:**

```bash
git fetch upstream
git rebase upstream/main
```

2. **Push your branch:**

```bash
git push origin feat/your-feature-name
```

3. **Open a PR** on GitHub against the `main` branch with:
   - A clear title describing the change
   - A description explaining **what** changed and **why**
   - Reference any related issues (e.g., `Closes #42`)
   - Include screenshots or terminal output if applicable

4. **Respond to review feedback** promptly

### PR Checklist

- [ ] Code builds without errors (`pnpm build:native`)
- [ ] Version is synced (`node scripts/check-version-sync.js`)
- [ ] New features include documentation
- [ ] Breaking changes are noted in the PR description
- [ ] Commit messages are clear and descriptive

## Reporting Issues

When reporting bugs, please include:

- **OS and version** (e.g., Ubuntu 22.04, macOS 14.2)
- **Node.js version** (`node --version`)
- **agent-browser version** (`agent-browser --version`)
- **Steps to reproduce** the issue
- **Expected vs. actual behavior**
- **Error output** or screenshots

## Questions?

If you have questions about contributing, feel free to open a [discussion](https://github.com/dextonai/agent-browser/discussions) or comment on an existing issue.
