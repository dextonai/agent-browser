# Contributing to Agent Browser

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick Start

### 1. Fork and Clone

```bash
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
```

### 2. Install Dependencies

```bash
# Install pnpm if you haven't
npm install -g pnpm

# Install dependencies
pnpm install
```

### 3. Download Chromium

```bash
pnpm exec agent-browser install
```

### 4. Verify Setup

```bash
pnpm exec agent-browser --version
pnpm test
```

---

## 🛠️ Development

### Build

```bash
# Build TypeScript
pnpm build

# Build Rust binary (if making CLI changes)
cd cli && cargo build --release
```

### Run Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test src/browser.test.ts

# Run with coverage
pnpm test --coverage
```

### Linting

```bash
# Check code style
pnpm lint

# Auto-fix issues
pnpm lint:fix
```

---

## 📝 Coding Guidelines

### TypeScript Style

- Use TypeScript strict mode
- Follow existing code patterns
- Add JSDoc for public APIs
- Use async/await for async code

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new browser automation feature
fix: resolve chromium download issue
docs: update installation guide
test: add unit tests for browser pool
```

### Code Review

Before submitting:
- [ ] Tests pass
- [ ] Linting passes
- [ ] Code is formatted
- [ ] Documentation updated

---

## 📤 Submitting PRs

### 1. Create Branch

```bash
git checkout -b feat/your-feature-name
```

### 2. Make Changes

- Write code
- Add tests
- Update docs

### 3. Commit

```bash
git add .
git commit -m "feat: your feature description"
```

### 4. Push and Create PR

```bash
git push origin feat/your-feature-name
```

Then open a PR on GitHub with:
- Clear description of changes
- Link to related issues
- Screenshots if UI changes
- Test results

---

## 🧪 Testing Guidelines

### Unit Tests

```typescript
// Example test
import { describe, it, expect } from 'vitest';

describe('Browser Pool', () => {
  it('should create new browser instance', async () => {
    const browser = await pool.create();
    expect(browser).toBeDefined();
  });
});
```

### Integration Tests

Test real browser automation:
```typescript
import { Browser } from '../src/browser';

it('should navigate to page', async () => {
  const browser = new Browser();
  await browser.navigate('https://example.com');
  const title = await browser.getTitle();
  expect(title).toBe('Example Domain');
});
```

---

## 🐛 Reporting Issues

### Bug Report Template

```markdown
**Description**
What's the problem?

**Steps to Reproduce**
1. Run command: `...`
2. See error: `...`

**Expected Behavior**
What should happen?

**Environment**
- OS: macOS/Windows/Linux
- Node version: v20.x.x
- agent-browser version: x.x.x

**Logs**
Paste error logs here
```

### Feature Request Template

```markdown
**Problem**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives**
Other solutions you considered?

**Use Cases**
Who will use this feature?
```

---

## 📚 Resources

- [Documentation](./docs/)
- [API Reference](./docs/api.md)
- [Examples](./docs/examples/)
- [Changelog](./CHANGELOG.md)

---

## 💬 Getting Help

- Open an issue for bugs
- Use Discussions for questions
- Join our Discord for chat

---

## 🎯 Areas Needing Help

### High Priority
- [ ] Windows compatibility improvements
- [ ] Performance optimization
- [ ] Documentation examples

### Medium Priority
- [ ] Additional browser automation features
- [ ] CI/CD pipeline improvements
- [ ] Test coverage

### Good First Issues
- [ ] Documentation typos
- [ ] Code comments
- [ ] Example scripts

---

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Added to contributors page

---

**Thanks for contributing!** 🙏

Every contribution makes Agent Browser better for everyone.
