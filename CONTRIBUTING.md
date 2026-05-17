# Contributing to Agent Browser

Thanks for contributing! Here's how to get started.

## Development Environment Setup

```bash
# 1. Clone and install
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
npm install

# 2. Run tests to verify your setup
npm test

# 3. Start dev server (if applicable)
npm run dev
```

**Requirements**: Node.js >= 18, npm >= 9

## Coding Style

- **TypeScript** strict mode — all new code must be typed
- **Formatting**: Run `npm run format` before committing (uses Prettier)
- **Linting**: Run `npm run lint` — CI will fail on lint errors
- **Naming**: Use `camelCase` for variables/functions, `PascalCase` for classes/components
- **Imports**: Group imports: built-ins → third-party → local. Use named exports.
- **Comments**: Explain _why_, not _what_. The code should document itself.

## Submitting a Pull Request

1. **Fork** the repository and create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** — keep commits small and focused. One commit per logical change.

3. **Write tests** for new functionality. Existing tests must pass.

4. **Update documentation** if your change affects public APIs.

5. **Push and open a PR** against the `main` branch. In your PR description:
   - What problem does this solve?
   - How did you test it?
   - Any breaking changes?

6. **CI checks** must pass before review. A maintainer will review within 3 business days.

## Reporting Issues

- Use the issue templates if available
- Include steps to reproduce, expected behavior, and actual behavior
- Share your environment: OS, Node version, browser version

## Communication

- Be respectful and constructive
- Follow the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct
- Tag issues appropriately with labels

## License

By contributing, you agree that your contributions will be licensed under the project's license.
