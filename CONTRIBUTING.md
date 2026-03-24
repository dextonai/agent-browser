# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the project**
   ```bash
   npm run dev
   ```

## Coding Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Follow strict mode settings
- Use meaningful type definitions
- Avoid `any` type when possible

### Code Format

- Use 2 spaces for indentation
- Maximum line length: 100 characters
- Use semicolons at the end of statements
- Use single quotes for strings

### Naming Conventions

- **Variables/Functions**: camelCase
- **Components/Classes**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Files**: lowercase with hyphens

### Commit Messages

Follow conventional commits:
```
feat: add new browser automation feature
fix: resolve timeout issue in page navigation
docs: update README with examples
refactor: improve error handling
test: add unit tests for core functions
```

## How to Submit a Pull Request

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### 2. Make Your Changes

- Keep changes focused and atomic
- Write/update tests as needed
- Update documentation if applicable

### 3. Test Your Changes

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build the project
npm run build
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: your descriptive message"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New pull request"
3. Select your branch
4. Fill in the PR template:
   - **Description**: What does this PR do?
   - **Related Issues**: Link any related issues
   - **Testing**: How did you test this?
5. Submit the PR

## PR Review Process

- All PRs require at least one review
- Be responsive to feedback
- Make requested changes promptly
- Once approved, your PR will be merged

## Questions?

- Open an issue for bugs or feature requests
- Join our community discussions
- Check existing documentation

Thank you for contributing! 🎉
