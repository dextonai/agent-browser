# Contributing to agent-browser

Thanks for helping improve agent-browser. This guide covers the basic local workflow for documentation, TypeScript packaging, and the native Rust CLI.

## Development Setup

1. Install the project dependencies:

```bash
pnpm install
```

2. Install the Rust toolchain if you plan to work on the native CLI:

```bash
rustup default stable
```

3. Build the JavaScript package and native binary as needed:

```bash
pnpm build:native
```

For a faster Rust-only loop, run commands directly against the CLI crate:

```bash
cargo build --manifest-path cli/Cargo.toml
```

## Code Style

- Use `pnpm` for package scripts and dependency management.
- Use kebab-case for CLI flags, for example `--auto-connect` instead of `--autoConnect`.
- Keep documentation updates in sync with user-facing behavior changes.
- Run Rust formatting before submitting CLI changes:

```bash
cargo fmt --manifest-path cli/Cargo.toml -- --check
```

- Run Clippy for Rust changes:

```bash
cargo clippy --manifest-path cli/Cargo.toml -- -D warnings
```

## Testing

Run the standard Rust test suite:

```bash
cargo test --profile ci --manifest-path cli/Cargo.toml
```

End-to-end tests require Chrome and run headless browser sessions. Use them when changing browser automation behavior:

```bash
cargo test --profile ci --manifest-path cli/Cargo.toml e2e -- --ignored --test-threads=1
```

## Pull Request Workflow

1. Create a focused branch for your change.
2. Keep the diff small and explain the user-visible behavior in the PR description.
3. Link the relevant issue, if one exists.
4. Include the commands you ran to verify the change.
5. Update docs when changing commands, flags, environment variables, output, or workflows.

For documentation-only changes, mention that no runtime tests were required and explain what was reviewed instead.
