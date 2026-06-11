# Contributing

Thanks for helping improve agent-browser. This guide covers local setup, coding expectations, and the pull request process for documentation and code changes.

## Development Setup

1. Install prerequisites:
   - Node.js and pnpm for package scripts.
   - Rust via rustup when building or testing the native CLI.
   - Chrome when running end-to-end browser tests.
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build from source when you need to validate the native CLI:

   ```bash
   pnpm build:native
   ```

4. Link the local binary only when you need to test global CLI behavior:

   ```bash
   pnpm link --global
   agent-browser install
   ```

## Coding Style

- Use pnpm for JavaScript package commands.
- Follow the existing Rust and TypeScript layout instead of introducing new patterns for small changes.
- Keep CLI flags in kebab-case, for example `--auto-connect`.
- Respect `NO_COLOR` by using the existing color helpers instead of hardcoded ANSI escape codes.
- For user-facing feature changes, update the help output, README, skill documentation, docs site, and relevant inline comments together.
- Keep documentation tables consistent with the existing docs convention; MDX pages use HTML tables.

## Testing

Run the checks that match the files you changed. Common commands include:

```bash
cd cli && cargo test
cd cli && cargo fmt -- --check
cd cli && cargo clippy
```

End-to-end tests launch a real browser and should run serially:

```bash
cd cli && cargo test e2e -- --ignored --test-threads=1
```

For documentation-only changes, review the rendered Markdown and run formatting or link checks when available.

## Pull Request Process

1. Create a focused branch for one change.
2. Keep commits scoped and descriptive.
3. Include a clear PR summary, the validation you ran, and any follow-up risks.
4. Reference the related issue or bounty in the PR body when applicable.
5. Do not include secrets, local credentials, private runtime configuration, or unrelated generated files.
6. Respond to review feedback with focused follow-up commits.
