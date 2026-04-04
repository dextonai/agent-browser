# Contributing to Agent Browser

Thank you for your interest in contributing to Agent Browser! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/dextonai/agent-browser.git
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm test
```

### Environment Variables

Create a `.env` file:

```env
DEBUG=true
HEADLESS=false
DEFAULT_TIMEOUT=30000
```

## Making Changes

### Types of Contributions

- 🐛 **Bug fixes** - Fix existing issues
- ✨ **Features** - Add new functionality
- 📚 **Documentation** - Improve docs
- 🧪 **Tests** - Add or improve tests
- 🔧 **Refactoring** - Code improvements

### Branch Naming

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

### Commit Messages

Follow conventional commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Example:
```
feat(browser): add screenshot on failure option

Adds automatic screenshot capture when navigation fails.
Useful for debugging CI failures.

Closes #123
```

## Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure tests pass**:
   ```bash
   npm test
   npm run lint
   ```
4. **Update CHANGELOG.md** with your changes
5. **Submit PR** with clear description

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new features
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process

- Maintainers will review within 48 hours
- Address review comments
- Squash commits if requested
- PR will be merged by maintainers

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for new code
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for public APIs

### Code Style

```typescript
// Good
async function navigateToPage(url: string): Promise<Page> {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  return page;
}

// Avoid
async function nav(u) {
  let p = await b.newPage();
  await p.goto(u);
  return p;
}
```

### File Organization

```
src/
├── core/           # Core functionality
├── utils/          # Utility functions
├── types/          # TypeScript types
└── __tests__/      # Test files
```

## Testing

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Specific file
npm test -- src/core/browser.test.ts
```

### Writing Tests

```typescript
describe('Browser', () => {
  it('should navigate to URL', async () => {
    const browser = new Browser();
    const page = await browser.navigate('https://example.com');
    expect(page.url()).toBe('https://example.com/');
  });
});
```

## Documentation

- Update README.md for user-facing changes
- Update API docs for public interface changes
- Add JSDoc comments
- Include code examples

## Questions?

- Open an issue for discussion
- Join our Discord: [link]
- Email: maintainers@agent-browser.dev

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
