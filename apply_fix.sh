cat << 'EOF' > CONTRIBUTING.md
# Contributing to agent-browser

First off, thank you for considering contributing to `agent-browser`! It's people like you that make `agent-browser` such a great tool.

## Setting up the development environment

1. Fork and clone the repository.
2. Ensure you have Node.js installed.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Run the tests to ensure everything is working:
   ```bash
   npm test
   ```

## Coding Style Guidelines

- We use Prettier for code formatting and ESLint for linting.
- Before committing, ensure your code matches the project's style.
- Use TypeScript and ensure all types are correctly defined.
- Write tests for any new features or bug fixes.

## Submitting a Pull Request

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. Make your changes and commit them with descriptive commit messages.
3. Push your branch to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```
4. Open a Pull Request against the `main` branch of the `dextonai/agent-browser` repository.
5. Provide a clear description of the changes in the PR description.
EOF

if [ -f "README.md" ]; then
  if grep -q "^#" README.md; then
    awk '!done && /^# / {print; print "\n[![Build Status](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions)"; done=1; next} 1' README.md > README.md.tmp && mv README.md.tmp README.md
  else
    echo "[![Build Status](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions)" | cat - README.md > README.md.tmp && mv README.md.tmp README.md
  fi
else
  echo "# agent-browser" > README.md
  echo "" >> README.md
  echo "[![Build Status](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions)" >> README.md
fi