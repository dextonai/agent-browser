# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js 20 or later
- pnpm 9 or later
- Rust (for native CLI builds) - optional but recommended

### Installation

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Build the project:
   ```bash
   pnpm build
   ```

## Coding Style

- Use TypeScript for all new code
- Follow the existing code style
- Run ```pnpm format``` to format your code with Prettier
- Run ```pnpm typecheck``` to check for type errors

## Submitting a Pull Request

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit them with clear messages
3. Push your branch to your fork
4. Open a pull request against the main branch
5. Ensure all CI checks pass

## Running Tests

```bash
pnpm test
```

## Questions?

Feel free to open an issue for any questions or discussions.