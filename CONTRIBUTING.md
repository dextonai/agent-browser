# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document explains how to get started.

## Setting up the development environment

### Prerequisites

- **Node.js 18+** and **npm** — for running scripts and tests
- **Rust** — only needed when building from source ([install via rustup](https://rustup.rs))

### Clone and install

```bash
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
pnpm install
```

## Coding style guidelines

- **TypeScript**: Use the existing tsconfig.json settings. Run `npx tsc --noEmit` to check types.
- **Rust**: Follow `cargo fmt` and `cargo clippy` conventions.
- **Commit messages**: Use clear, concise imperative mood (e.g., "Add stealth mode for headless detection").
- **PR scope**: Keep PRs focused on a single concern. Split large changes into smaller, reviewable PRs.

## How to submit a pull request

1. Fork the repository and create a branch from `main`.
2. Make your changes, ensuring tests pass.
3. Open a PR against `main` with a clear description of the change.
4. Respond to reviewer feedback promptly.

## Reporting issues

If you find a bug or have a feature request, please open an issue with:
- A clear description of the problem or request
- Steps to reproduce (for bugs)
- Your OS and agent-browser version
