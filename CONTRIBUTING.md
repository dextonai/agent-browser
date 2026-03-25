# Contributing to agent-browser

First off, thank you for considering contributing to agent-browser!

## Development Environment Setup

1. **Fork & Clone:** Fork the repository on GitHub and clone your fork locally.
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-browser.git
   cd agent-browser
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Build:**
   ```bash
   npm run build
   ```
4. **Test:**
   ```bash
   npm test
   ```

## Coding Style Guidelines

- **TypeScript:** Write strongly typed TypeScript.
- **Linting & Formatting:** Ensure your code passes existing linting and formatting rules. Use Prettier/ESLint if configured.
- **Testing:** Include tests for any new features or bug fixes. Verify that all existing tests pass before submitting.

## How to Submit a Pull Request

1. Create a new branch from `main`: `git checkout -b feature/your-feature-name`
2. Commit your changes with descriptive commit messages.
3. Push to your fork: `git push origin feature/your-feature-name`
4. Open a Pull Request against the main repository.
5. Provide a clear description of your changes and reference any related issues.
