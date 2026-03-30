# Contributing to agent-browser

We love your input! We want to make contributing to this project as easy and transparent as possible. By participating in this project, you agree to abide by our code of conduct.

## Development Setup

`agent-browser` is built using a combination of TypeScript (for the npm packages and scripts) and Rust (for the core CLI daemon capability).

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Rust toolchain](https://rustup.rs/) (cargo)
- A C++ compiler toolchain (required by some native deps)

### Local Build Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dextonai/agent-browser.git
   cd agent-browser
   ```

2. **Install JavaScript dependencies:**
   ```bash
   pnpm install
   ```

3. **Build the CLI executable:**
   ```bash
   pnpm build:native
   ```
   *This compiles the Rust core and places the `agent-browser` binary into the `bin/` directory.*

4. **Link specific bins (optional):**
   ```bash
   pnpm link --global
   ```
   Now you can use `agent-browser` globally.

## Creating a Pull Request

1. **Fork the repository and clone it locally**.
2. **Create a new branch** for your feature or bugfix (`git checkout -b feature/my-awesome-feature`).
3. **Write and run tests**: Ensure that existing features are not broken.
4. **Follow code style**: 
   - We use Prettier/ESLint for JS/TS (`pnpm install` will pull the configs).
   - We use `cargo fmt` for Rust files.
5. **Commit your changes**: We follow Conventional Commits (e.g. `feat: added something`, `fix: corrected bug`).
6. **Push and Open a PR**: Provide a clear description of the problem solved or feature added. A maintainer will review your code.

## Submitting bugs or requesting new features

- **Search open issues** before submitting a new bug report.
- Include OS, Node version, and the version of the CLI you are testing.
- Include a minimal reproducible example for bugs when possible.

Thank you for contributing!
