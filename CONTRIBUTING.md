

# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This guide will help you get started.

## Development Setup

### Prerequisites

- **Node.js** >= 18
- **pnpm** (recommended) or npm
- **Rust** (for building the native CLI) — install via [rustup](https://rustup.rs/)

### Getting Started

1. Fork and clone the repository:
   \\\ash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   \\\

2. Install dependencies:
   \\\ash
   pnpm install
   \\\

3. Build the project:
   \\\ash
   pnpm build
   pnpm build:native   # Requires Rust toolchain
   \\\

## Coding Style

- **TypeScript**: Follow the existing code style. We use Prettier for formatting.
- **Rust**: Follow standard Rust formatting (\ustfmt\).
- Run formatting before committing:
  \\\ash
  pnpm format
  \\\

## Submitting a Pull Request

1. Create a feature branch from \main\:
   \\\ash
   git checkout -b feature/my-feature
   \\\

2. Make your changes and commit with clear messages.

3. Ensure tests pass:
   \\\ash
   pnpm test
   \\\

4. Push your branch and open a PR against \main\ on the original repository.

5. In your PR description, include:
   - What problem you're solving
   - How you tested the changes
   - Any breaking changes or migration steps

## Reporting Issues

- Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues) to report bugs or request features.
- Include reproduction steps, expected behavior, and actual behavior.

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.