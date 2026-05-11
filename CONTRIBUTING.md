# Contributing

Thanks for helping improve agent-browser. This guide covers the local setup,
coding standards, and pull request process for contributors.

## Development Setup

### Prerequisites

- Node.js 22 or newer
- pnpm
- Rust stable toolchain
- Chrome or Chrome for Testing for end-to-end tests

Install dependencies:

```bash
pnpm install
```

Build the TypeScript package and native CLI:

```bash
pnpm build:native
```

Install Chrome for browser automation tests:

```bash
cargo run --manifest-path cli/Cargo.toml -- install
```

On Linux, include system dependencies:

```bash
cargo run --manifest-path cli/Cargo.toml -- install --with-deps
```

## Common Commands

Run the Rust test suite:

```bash
cargo test --manifest-path cli/Cargo.toml
```

Check Rust formatting:

```bash
cargo fmt --manifest-path cli/Cargo.toml -- --check
```

Run Clippy:

```bash
cargo clippy --manifest-path cli/Cargo.toml -- -D warnings
```

Run ignored end-to-end tests serially:

```bash
cargo test --profile ci --manifest-path cli/Cargo.toml e2e -- --ignored --test-threads=1
```

Check package version synchronization:

```bash
node scripts/check-version-sync.js
```

## Coding Style

- Use pnpm for package management.
- Keep CLI flags in kebab-case, such as `--auto-connect`.
- Do not hardcode ANSI escape sequences. Use `cli/src/color.rs` for colored CLI output.
- Keep user-facing documentation in sync with behavior changes.
- Use concise, direct documentation and examples.
- Avoid unrelated refactors in small fixes.

When adding or changing user-facing CLI behavior, update every relevant surface:

- `cli/src/output.rs`
- `README.md`
- `skills/agent-browser/SKILL.md`
- `docs/src/app/`
- Inline doc comments in the related source files

## Pull Request Process

1. Create a focused branch from `main`.
2. Make the smallest change that fully solves the issue.
3. Run the relevant checks locally before opening a pull request.
4. Include a clear summary, changed files, and verification notes in the PR body.
5. Link the related issue with `Closes #<issue-number>` when applicable.

For bounty submissions, include the bounty reference requested by the issue in
the pull request body.

