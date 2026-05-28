# Contributing to agent-browser

## Development Setup

1. **Clone the repo:**

```bash
git clone https://github.com/dextonai/agent-browser.git
cd agent-browser
```

2. **Install JavaScript dependencies:**

```bash
pnpm install
```

3. **Install Rust:**

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

4. **Build the native CLI:**

```bash
pnpm build:native
```

5. **Install Chrome (required for e2e tests):**

```bash
cargo run --manifest-path cli/Cargo.toml -- install --with-deps
```

## Coding Style

- **Rust code** follows standard `rustfmt` conventions. Run `cargo fmt --manifest-path cli/Cargo.toml -- --check` before committing.
- **CLI flags** must use kebab-case (e.g., `--auto-connect`, `--allow-file-access`). Never use camelCase for flags.
- **Documentation** additions must update: `README.md`, `cli/src/output.rs`, `skills/agent-browser/SKILL.md`, and `docs/src/app/` when relevant.
- **No emojis** in code, output, or documentation. Unicode symbols (checkmark, cross) are acceptable.
- **Use `pnpm`** instead of `npm` or `yarn` for all package operations.

## How to Submit a PR

1. Create a feature branch from `main`:

```bash
git checkout -b feat/your-feature-name
```

2. Make your changes, keeping the scope small and focused.

3. Run linting and tests:

```bash
cd cli && cargo fmt -- --check
cd cli && cargo clippy
cd cli && cargo test
```

4. Commit with a clear message:

```bash
git commit -m "feat: concise description of your change"
```

5. Push and open a PR against `main`:

```bash
git push origin feat/your-feature-name
```

6. Reference any related issues or bounties in the PR body.
