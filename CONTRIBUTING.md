# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document outlines the process for contributing to this project.

## How to Contribute

### 1. Setup Development Environment

#### Prerequisites
- Node.js 18+
- Rust (for building the native CLI)
- Git

#### Installation for Development
```bash
# Clone the repository
git clone https://github.com/dextonai/agent-browser
cd agent-browser

# Install dependencies
npm install

# Install Rust (if you want to build the native CLI)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Build the project
npm run build
```

#### Testing Setup
```bash
# Install test dependencies
npm install --dev

# Run tests
npm test

# Build and run the native CLI
npm run build:native
```

### 2. Code Style Guidelines

#### JavaScript/TypeScript
- Follow ESLint configuration
- Use Prettier for formatting
- Write descriptive commit messages
- Include tests for new features

#### Rust
- Follow Rust standard formatting with rustfmt
- Use cargo for building and testing
- Include doc comments for public APIs

#### General Guidelines
- Keep functions small and focused
- Write clear comments for complex logic
- Follow existing patterns in the codebase
- Consider edge cases and error handling

### 3. Pull Request Process

#### Creating a Pull Request
1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and test them
4. Submit a PR with a clear description

#### PR Requirements
- Include tests for new functionality
- Update documentation if needed
- Follow the existing code style
- Describe the changes clearly
- Reference any related issues

#### Review Process
- PRs are reviewed by maintainers
- Automated tests must pass
- Code style must be consistent
- Documentation must be updated

### 4. Reporting Issues

#### Bug Reports
- Use GitHub Issues
- Include steps to reproduce
- Describe expected vs actual behavior
- Include relevant logs or screenshots

#### Feature Requests
- Explain the need/use case
- Suggest implementation if possible
- Consider compatibility with existing features

### 5. Community

#### Communication
- Use GitHub Issues for technical discussions
- Respectful and constructive feedback
- Helpful and welcoming to newcomers

#### Recognition
- Contributors are credited in commit history
- Significant contributions may be highlighted

Thank you for contributing to agent-browser!