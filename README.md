# Agent Browser

[![Build Status](https://github.com/dextonai/agent-browser/workflows/CI/badge.svg)](https://github.com/dextonai/agent-browser/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![npm version](https://badge.fury.io/js/agent-browser.svg)](https://www.npmjs.com/package/agent-browser)

A fast, Rust-based headless browser automation tool with Node.js bindings for AI agents.

## Features

- ⚡ **High Performance** - Rust core for maximum speed
- 🔧 **Easy Integration** - Simple Node.js API
- 📸 **Screenshot Support** - Capture page renders
- 🔍 **Element Detection** - Smart element selection
- 📝 **Form Automation** - Fill and submit forms
- 🌐 **Multi-page** - Handle multiple tabs

## Installation

```bash
npm install agent-browser
```

## Quick Start

```typescript
import { Browser } from 'agent-browser';

const browser = new Browser();
await browser.launch();

const page = await browser.newPage();
await page.goto('https://example.com');

// Take screenshot
await page.screenshot({ path: 'example.png' });

await browser.close();
```

## Documentation

- [API Reference](docs/API.md)
- [Examples](examples/)
- [Contributing Guide](CONTRIBUTING.md)

## License

MIT © [Agent Browser Team](LICENSE)
