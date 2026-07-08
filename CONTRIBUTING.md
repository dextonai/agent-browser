# Contributing to agent-browser

Thank you for your interest in contributing! This guide covers everything you need.

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Rust toolchain (for native CLI): `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- Chrome for Testing (auto-installed via `agent-browser install`)

### Getting Started
```bash
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
npm install
agent-browser install
```

### Running Tests
```bash
npm test
```

### Building from Source
```bash
# Build the Rust CLI
cargo build --release

# Build the npm package
npm run build
```

## Coding Style

### TypeScript/JavaScript
- Use strict TypeScript (`strict: true`)
- Prefer `const` over `let`; avoid `var`
- Use async/await over raw promises
- Add JSDoc comments to exported functions
- Follow existing formatting (Prettier defaults)

### Rust
- Follow `rustfmt` defaults: `cargo fmt`
- Run Clippy before submitting: `cargo clippy -- -D warnings`
- Add doc comments (`///`) to public items
- Handle errors with `Result<T, E>`, never panic in library code

## Submitting Changes

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/my-change`
3. Make focused, atomic commits with clear messages
4. Add or update tests for your changes
5. Run the full test suite: `npm test && cargo test`
6. Open a Pull Request with:
   - Clear description of the change
   - Link to any related issues
   - Steps to test manually if applicable

## Pull Request Guidelines

- Keep PRs small and focused — one concern per PR
- Include tests for new functionality
- Update documentation if behavior changes
- Be responsive to review feedback

## Reporting Issues

- Search existing issues before opening a new one
- Include: Node.js version, Rust version, OS
- Provide minimal reproduction steps
- Show relevant logs or error output

## Questions?

Open an issue or start a discussion on this repo.
