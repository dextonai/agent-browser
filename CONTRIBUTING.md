# Contributing to agent-browser

## Dev environment setup

```bash
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
npm install
npm run build
```

Requirements: Node.js 22+, npm 10+. The project is written in TypeScript and uses the `agent-browser` CLI for headless browser automation.

## Coding style guidelines

- TypeScript strict mode — all code must pass `tsc --noEmit`
- Prettier formatting with default config (2-space indent, single quotes, trailing commas)
- Functions use explicit return types unless inferrable from context
- Exported functions include JSDoc comments describing parameters and return values
- Error handling: use try/catch for browser operations, propagate meaningful error messages

## How to submit a PR

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-change`
3. Make your changes and write/update tests
4. Run `npm test` and `npm run lint` to verify
5. Commit with a descriptive message: `feat: description` or `fix: description`
6. Push and open a Pull Request against the `main` branch
7. Reference any related issues in the PR description
