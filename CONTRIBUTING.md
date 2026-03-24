# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+
- Rust (for native CLI development)

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser

# Install dependencies
pnpm install

# Install Chromium for testing
pnpm exec agent-browser install
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Building

```bash
# Build the project
pnpm build
```

## Coding Style

- We use **Prettier** for code formatting
- Follow existing patterns in the codebase
- Write meaningful commit messages
- Add tests for new features

## Submitting a PR

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and commit them
4. Push to your fork: `git push origin feature/my-feature`
5. Open a Pull Request
6. Reference the bounty ID in the PR body if applicable

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

## Resources

- [Documentation](./docs)
- [Agent Guide](./AGENTS.md)
- [GitHub Issues](https://github.com/dextonai/agent-browser/issues)
