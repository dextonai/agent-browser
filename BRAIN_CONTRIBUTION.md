**PROPOSED ACTION:** Create a CONTRIBUTING.md file and update README.md to include a status badge.

**CONTRIBUTING.md:**
```markdown
# Contributing to Agent Browser

## Setting up the Dev Environment

1. Clone the repository: `git clone https://github.com/dextonai/agent-browser.git`
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm start` or `yarn start`

## Coding Style Guidelines

We follow the standard TypeScript coding style guidelines. Please ensure your code adheres to these guidelines.

## Submitting a PR

1. Create a new branch: `git checkout -b feature/new-feature`
2. Make changes and commit them: `git add . && git commit -m "New feature"`
3. Push the branch to the remote repository: `git push origin feature/new-feature`
4. Open a pull request on GitHub, referencing the original issue or feature request.

## Code Review

We use a code review process to ensure that all changes meet our quality standards. Please be prepared to address any feedback or concerns raised during the review process.
```

**README.md (updated):**
```markdown
# Agent Browser

[![Build Status](https://github.com/dextonai/agent-browser/workflows/Build/badge.svg)](https://github.com/dextonai/agent-browser/actions)

## Overview

Agent Browser is a [briefly describe the project].

## Getting Started

1. Clone the repository: `git clone https://github.com/dextonai/agent-browser.git`
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm start` or `yarn start`

## Contributing

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to Agent Browser.
```

**PROPOSED ACTION:** Create a pull request referencing `bounty:8e29b86d-2387-4a5a-bd72-69afaa74c4ad` in the PR body.