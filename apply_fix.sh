cat << 'EOF' > CONTRIBUTING.md
# Contributing to agent-browser

First off, thank you for considering contributing to agent-browser!

## Development Environment

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/dextonai/agent-browser.git
   cd agent-browser
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the test suite to verify your environment:
   ```bash
   npm test
   ```

## Coding Style Guidelines

- **TypeScript**: All new code should be written in TypeScript.
- **Formatting**: We use standard formatters (like Prettier). Please ensure your code is formatted before submitting.
- **Linting**: Address any linting errors.
- **Testing**: Include tests for any new features or bug fixes.

## Submitting a Pull Request

1. Create a new branch for your feature or bugfix from `main`.
2. Make your changes and commit them with descriptive commit messages.
3. Ensure all tests and linting checks pass.
4. Push your branch to your fork.
5. Open a Pull Request against the `main` branch of the `dextonai/agent-browser` repository.
6. Provide a detailed description of the changes you've made in the PR body.
EOF

if [ -f README.md ]; then
  awk '/^# / && !done { print; print "\n[![Build Status](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions)"; done=1; next } 1' README.md > README.md.tmp
  if ! grep -q "Build Status" README.md.tmp; then
    echo "[![Build Status](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions)" > README.md.tmp2
    echo "" >> README.md.tmp2
    cat README.md >> README.md.tmp2
    mv README.md.tmp2 README.md
    rm -f README.md.tmp
  else
    mv README.md.tmp README.md
  fi
else
  echo '# agent-browser' > README.md
  echo '' >> README.md
  echo '[![Build Status](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions)' >> README.md
fi