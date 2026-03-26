# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Coding Style](#coding-style)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

Be respectful and inclusive. Treat others as you would like to be treated.

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Rust (for native CLI development)
- Git

### Getting Started

1. **Fork the repository**

   Click the "Fork" button on GitHub to create your own copy.

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Build the project**

   ```bash
   pnpm build
   ```

5. **Run tests**

   ```bash
   pnpm test
   ```

### Project Structure

```
agent-browser/
├── bin/           # Binary entry points
├── cli/           # Rust CLI source
├── src/           # TypeScript source
├── test/          # Test files
├── docs/          # Documentation
└── scripts/       # Build and utility scripts
```

## Coding Style

### TypeScript

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Format code with Prettier

### Rust

- Follow Rust standard formatting (`cargo fmt`)
- Use `clippy` for linting
- Document public functions with `///` comments

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks

Example: `feat: add support for custom user agents`

## Submitting Changes

### Pull Request Process

1. **Create a branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**

   Write clean, well-documented code.

3. **Test your changes**

   ```bash
   pnpm test
   pnpm lint
   ```

4. **Commit your changes**

   ```bash
   git commit -m "feat: your feature description"
   ```

5. **Push to your fork**

   ```bash
   git push origin feat/your-feature-name
   ```

6. **Open a Pull Request**

   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Reference any related issues

### PR Guidelines

- Keep PRs focused and atomic
- Write clear descriptions
- Update documentation if needed
- Add tests for new features
- Ensure CI passes

## Reporting Issues

### Before Reporting

1. Search existing issues to avoid duplicates
2. Try the latest version
3. Check documentation

### Issue Template

When reporting a bug, include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: How to trigger the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, Node.js version, package version
- **Logs**: Relevant error messages or logs

## Questions?

Feel free to open an issue for questions or reach out to the maintainers.

---

Thank you for contributing to agent-browser!