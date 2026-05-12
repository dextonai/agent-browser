# Contributing to Agent Browser

Thank you for your interest in contributing to Agent Browser! This document provides guidelines for setting up the development environment, coding style, and submitting pull requests.

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

### Installation

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development:
   ```bash
   npm run dev
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Coding Style

- Follow the existing code style
- Use TypeScript for all new code
- Run `npm run lint` before committing
- Run `npm run format` to ensure consistent formatting
- Write meaningful commit messages

## Submitting a Pull Request

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request**:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR description template
   - Reference any related issues

## PR Guidelines

- Keep PRs focused on a single change
- Include tests for new features
- Update documentation if needed
- Ensure all tests pass
- Be responsive to review feedback

## Questions?

Feel free to open an issue for any questions or discussions about contributing.
