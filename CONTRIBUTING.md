# Contributing

Thanks for your interest in contributing to agent-browser. This guide covers local setup, style expectations, and the pull request workflow.

## Development setup

1. Install dependencies:

```bash
pnpm install
```

2. Build the project:

```bash
pnpm build
```

3. Build the native CLI (requires Rust):

```bash
pnpm build:native
```

### Rust tests (optional)

```bash
cd cli
cargo test
```

## Code style and conventions

- Use pnpm for all package management and scripts.
- Do not use emojis in code, output, or documentation.
- CLI flags must use kebab-case (for example, `--auto-connect`).
- Do not add hardcoded ANSI color codes. Use `cli/src/color.rs` for CLI colors.

If you introduce user-facing features (new flags, commands, behaviors, environment variables), update the following locations:

- `cli/src/output.rs` (CLI help output)
- `README.md`
- `skills/agent-browser/SKILL.md`
- `docs/src/app/` documentation pages
- Inline doc comments in relevant source files

## Pull request workflow

1. Create a feature branch from `main`.
2. Keep changes focused and scoped to a single topic.
3. Run relevant tests and formatters where applicable.
4. If your change affects releases, add a changeset with `pnpm changeset`.
5. Ensure CI is green before requesting review.

## Reporting issues

Please include clear reproduction steps, expected behavior, and environment details when filing issues.
