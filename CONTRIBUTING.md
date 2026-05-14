# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This guide will help you get started.

## Development Setup

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **Rust** (latest stable, for native CLI development)
- **Chrome/Chromium** (for testing browser automation)

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dextonai/agent-browser.git
   cd agent-browser
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install the browser:**
   ```bash
   agent-browser install
   ```

4. **Build the native binary (if modifying Rust code):**
   ```bash
   cargo build --release
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

## Coding Style Guidelines

### JavaScript/TypeScript
- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes
- Add JSDoc comments for public functions
- Keep functions small and focused (< 50 lines)

### Rust
- Follow standard **Rust formatting** (`cargo fmt`)
- Use `cargo clippy` to catch common issues
- Document public APIs with `///` doc comments
- Prefer `Result<T, E>` for error handling over `unwrap()`

### General
- Write clear commit messages following [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat: add new browser command`
  - `fix: resolve timeout issue with slow pages`
  - `docs: update README with installation steps`
  - `chore: update dependencies`
- Keep PRs small and focused (< 400 lines changed)
- Include tests for new functionality

## How to Submit a PR

1. **Fork** the repository
2. **Create a feature branch:**
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes** and commit with clear messages
4. **Test your changes:**
   ```bash
   npm test
   cargo test  # if modifying Rust code
   ```
5. **Push to your fork:**
   ```bash
   git push origin feat/your-feature-name
   ```
6. **Open a Pull Request** against the `main` branch
   - Include a clear description of what the PR does
   - Reference any related issues
   - Add screenshots for UI changes

## Reporting Issues

- Use [GitHub Issues](https://github.com/dextonai/agent-browser/issues)
- Include:
  - Steps to reproduce
  - Expected vs actual behavior
  - Your OS and Node.js version
  - Any error messages or logs

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
