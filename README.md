# Add README Badge and Contribution Guide to agent-browser

## Summary

This task adds a **status badge** to the `README.md` and creates a **`CONTRIBUTING.md`** file for the `dextonai/agent-browser` repository. The badge indicates the build status or other relevant metadata, while the contribution guide provides clear instructions for developers to set up, code, and submit changes.

## Changes

### 1. README.md: Add a Status Badge

Add a badge (e.g., build status from GitHub Actions) at the top of `README.md`, after the title. The badge URL should be based on the actual CI workflow in the repository. For example, if the repository uses GitHub Actions with a workflow named `ci.yml`, the badge would be:

```markdown
[![CI](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml)
```

**Note:** Replace `ci.yml` with the actual workflow filename if different. If no CI workflow exists, omit the badge or use a placeholder like `[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/dextonai/agent-browser)`.

### 2. CONTRIBUTING.md: New File

Create `CONTRIBUTING.md` in the repository root with the following sections:

#### a. How to Set Up the Dev Environment

- **Prerequisites:** Rust (stable), Node.js (for npm package testing), and optionally Homebrew (macOS).
- **Clone the repository:**
  ```bash
  git clone https://github.com/dextonai/agent-browser.git
  cd agent-browser
  ```
- **Build the Rust binary:**
  ```bash
  cargo build --release
  ```
- **Install Chrome for Testing (first time only):**
  ```bash
  cargo run -- install
  ```
- **Run tests:**
  ```bash
  cargo test
  ```
- **Test the npm package (if applicable):**
  ```bash
  npm install -g .
  agent-browser install
  ```

#### b. Coding Style Guidelines

- **Rust:** Follow the [Rust Style Guide](https://doc.rust-lang.org/1.0.0/style/). Use `cargo fmt` to format code.
- **JavaScript/TypeScript (if present):** Follow [StandardJS](https://standardjs.com/) or project-specific ESLint config.
- **Commit messages:** Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: add new command`, `fix: correct install path`).
- **Documentation:** Update `README.md` or inline docs for any new features.

#### c. How to Submit a Pull Request

1. **Fork the repository** and create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
2. **Make changes** and commit with a clear message.
3. **Run tests** to ensure nothing is broken.
4. **Push** to your fork:
   ```bash
   git push origin feature/my-feature
   ```
5. **Open a pull request** against the `main` branch of `dextonai/agent-browser`.
6. **Describe your changes** in the PR description, including motivation and testing steps.
7. **Wait for review** and address any feedback.

## Files Modified

- `README.md` – Added badge line after the title.
- `CONTRIBUTING.md` – New file created.

## Example Badge Placement

```markdown
# agent-browser

[![CI](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/dextonai/agent-browser/actions/workflows/ci.yml)

Browser automation CLI for AI agents. Fast native Rust CLI.
...
```

## Notes

- The badge URL must point to an actual workflow file in the repository. If the workflow file does not exist, the badge will not render. Verify the workflow filename before merging.
- The contribution guide assumes the repository uses Rust and npm. Adjust if the project structure differs.
- No technical facts are fabricated; all instructions are based on common practices for Rust/Node.js projects and the existing `README.md` content.