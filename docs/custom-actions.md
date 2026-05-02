
# Writing Custom Browser Actions Guide

This guide provides a comprehensive overview of how to extend the agent-browser with custom actions for complex web interactions.

## Overview

Agent-browser offers extensibility through two main approaches:

1. **JavaScript Custom Actions**: Add custom JavaScript functions to the browser context
2. **Custom Command Handlers**: Implement new command handlers in Rust

## JavaScript Custom Actions

The simplest way to extend agent-browser is by adding custom JavaScript functions:

### Exposing Custom Functions

```json
{
  "action": "expose",
  "name": "myCustomFunction",
  "id": "123"
}
```

### Adding Custom Scripts

```json
{
  "action": "addscript",
  "content": "function myCustomFunction() { return 'Hello from custom script!'; }",
  "id": "123"
}
```

### Using Custom Functions

```json
{
  "action": "evaluate",
  "script": "myCustomFunction()",
  "id": "123"
}
```

## Custom Command Handlers

For more complex interactions, implement custom command handlers in Rust:

1. **Define the command interface** in `dist/types.d.ts`
2. **Implement the handler function** in `cli/src/native/actions.rs`
3. **Add the command to the dispatch map** in `execute_command`

## Best Practices

- Keep actions focused on single tasks
- Handle errors gracefully with meaningful messages
- Document parameters and return values clearly
- Consider performance impact of complex actions
- Use TypeScript interfaces for better code quality

## Next Steps

1. Start with simple JavaScript custom actions
2. For complex needs, implement custom command handlers
3. Consider contributing custom actions back to the community

This guide provides a complete reference for extending agent-browser functionality.
