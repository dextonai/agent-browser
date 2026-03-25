#!/bin/bash

cat << 'EOF' > CONTRIBUTING.md
# Contributing to agent-browser

Thank you for your interest in contributing to agent-browser! Your contributions help make this project better for everyone.

## Development Environment Setup

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the build to verify your setup:
   ```bash
   npm run build
   ```
4. Run tests to ensure everything is working correctly:
   ```bash
   npm test
   ```

## Coding Style Guidelines

- **TypeScript**: We use TypeScript. Ensure your code is strongly typed and avoids using `any` wherever possible.
- **Formatting & Linting**: Follow the existing Prettier and ESLint configurations. Run `npm run lint` and format your code before submitting.
- **Testing**: Include unit tests for any new features or bug fixes (we use Vitest).
- **Documentation**: Document any new commands, complex logic, or architecture changes.

## How to Submit a PR

1. Create a new feature branch from the `main` branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. Make your changes and commit them with clear, descriptive commit messages.
3. Push your branch to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```
4. Open a Pull Request against the main `dextonai/agent-browser` repository.
5. Provide a clear description of the changes, what problem they solve, and reference any related issues.
EOF

if [ -f README.md ]; then
  if grep -q "^# " README.md; then
    awk '!c && /^# /{print; print "\n[![CI](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions)"; c=1; next}1' README.md > tmp.md && mv tmp.md README.md
  else
    awk 'NR==1{print "[![CI](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions)\n"; print; next}1' README.md > tmp.md && mv tmp.md README.md
  fi
else
  cat << 'EOF' > README.md
# agent-browser

[![CI](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions)
EOF
fi