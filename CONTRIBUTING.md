# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This guide will help you get started.

## Development Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended package manager)
- **Rust** (for building native components)

### Getting Started

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
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

4. **Build native components (requires Rust):**
   ```bash
   pnpm build:native
   ```

5. **Run tests:**
   ```bash
   pnpm test
   ```

6. **Link for local development:**
   ```bash
   pnpm link --global
   agent-browser install  # Download Chrome for Testing
   ```

## Project Structure

```
agent-browser/
├── src/              # TypeScript source code
├── native/           # Rust native CLI source
├── scripts/          # Build and utility scripts
├── docs/             # Documentation (Next.js)
├── tests/            # Test files
├── docker/           # Docker configuration
└── .github/          # GitHub Actions workflows
```

## Coding Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Follow the existing code style (2 spaces, single quotes)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Rust

- Follow Rust naming conventions
- Use `cargo fmt` for formatting
- Use `cargo clippy` for linting
- Add documentation comments for public items

### Git Commit Messages

Use conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(navigation): add back/forward commands
fix(snapshot): handle missing elements gracefully
docs(readme): update installation instructions
```

## Submitting a Pull Request

1. **Create a feature branch:**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes:**
   - Write clear, focused commits
   - Add tests for new functionality
   - Update documentation if needed

3. **Run the test suite:**
   ```bash
   pnpm test
   ```

4. **Push to your fork:**
   ```bash
   git push origin feat/your-feature-name
   ```

5. **Open a Pull Request:**
   - Use a clear, descriptive title
   - Reference any related issues
   - Include a description of what changed and why
   - Add screenshots for UI changes

## Reporting Bugs

When reporting bugs, please include:

1. **Environment:**
   - OS and version
   - Node.js version
   - Rust version (if building from source)

2. **Steps to reproduce:**
   - Clear, numbered steps
   - Expected behavior
   - Actual behavior

3. **Additional context:**
   - Error messages
   - Screenshots
   - Logs

## Feature Requests

For feature requests:

1. **Check existing issues** first
2. **Describe the problem** you're trying to solve
3. **Propose a solution** if you have one
4. **Explain the use case** for the feature

## Code Review Process

- All PRs require at least one review
- Address review comments promptly
- Keep PRs focused and small when possible
- Be open to feedback and suggestions

## Getting Help

- **GitHub Issues:** For bugs and feature requests
- **Discussions:** For questions and general discussion

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
