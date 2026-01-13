#!/usr/bin/env npx tsx
/**
 * Comprehensive Benchmark: agent-browser vs playwright-mcp
 * 
 * Tests realistic AI agent workflows on real websites.
 */

import { execSync, spawn } from 'child_process';
import * as path from 'path';

interface Result {
  tool: string;
  workflow: string;
  operation: string;
  timeMs: number;
  outputBytes: number;
}

const results: Result[] = [];

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  return `${(bytes / 1024).toFixed(1)}KB`;
}

// ============================================================================
// Agent-Browser Runner
// ============================================================================

function runAB(args: string[], session: string = 'bench'): { ms: number; output: string } {
  const start = performance.now();
  let output = '';
  try {
    output = execSync(`./bin/agent-browser ${args.join(' ')}`, {
      stdio: 'pipe',
      timeout: 30000,
      env: { ...process.env, AGENT_BROWSER_SESSION: session },
    }).toString();
  } catch (e: any) {
    output = e.stdout?.toString() || e.message || '';
  }
  return { ms: performance.now() - start, output };
}

// ============================================================================
// Playwright-MCP Runner
// ============================================================================

interface MCPClient {
  call: (tool: string, args: Record<string, unknown>) => Promise<{ ms: number; output: string }>;
  close: () => void;
}

async function createMCPClient(): Promise<MCPClient> {
  const mcpPath = path.join(process.cwd(), 'opensrc/repos/github.com/microsoft/playwright-mcp/cli.js');
  const proc = spawn('node', [mcpPath, '--headless'], { stdio: ['pipe', 'pipe', 'pipe'] });
  
  let buffer = '';
  let requestId = 0;
  const pending = new Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }>();

  proc.stdout!.on('data', (data: Buffer) => {
    buffer += data.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.id !== undefined && pending.has(msg.id)) {
          pending.get(msg.id)!.resolve(msg);
          pending.delete(msg.id);
        }
      } catch {}
    }
  });

  const send = (method: string, params: Record<string, unknown>): Promise<any> => {
    const id = ++requestId;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      proc.stdin!.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
      setTimeout(() => {
        if (pending.has(id)) {
          pending.delete(id);
          reject(new Error('Timeout'));
        }
      }, 30000);
    });
  };

  // Initialize
  await send('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'benchmark', version: '1.0.0' },
  });
  proc.stdin!.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized', params: {} }) + '\n');

  return {
    call: async (tool: string, args: Record<string, unknown>) => {
      const start = performance.now();
      const result = await send('tools/call', { name: tool, arguments: args });
      return { ms: performance.now() - start, output: JSON.stringify(result) };
    },
    close: () => proc.kill(),
  };
}

// ============================================================================
// Workflows
// ============================================================================

interface Workflow {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    ab: string[];
    mcp: { tool: string; args: Record<string, unknown> };
  }>;
}

const workflows: Workflow[] = [
  {
    name: 'Wikipedia Research',
    description: 'Navigate Wikipedia, read content, follow links',
    steps: [
      { name: 'Navigate', ab: ['open', 'https://en.wikipedia.org/wiki/Artificial_intelligence'], mcp: { tool: 'browser_navigate', args: { url: 'https://en.wikipedia.org/wiki/Artificial_intelligence' } } },
      { name: 'Snapshot', ab: ['snapshot', '-i'], mcp: { tool: 'browser_snapshot', args: {} } },
      { name: 'Get title', ab: ['get', 'title'], mcp: { tool: 'browser_snapshot', args: {} } },
      { name: 'Snapshot 2', ab: ['snapshot', '-i'], mcp: { tool: 'browser_snapshot', args: {} } },
      { name: 'Click link', ab: ['click', 'a[href="/wiki/Machine_learning"]'], mcp: { tool: 'browser_click', args: { element: 'Machine learning', ref: 'internal link' } } },
      { name: 'Snapshot 3', ab: ['snapshot', '-i'], mcp: { tool: 'browser_snapshot', args: {} } },
    ],
  },
  {
    name: 'GitHub Browse',
    description: 'Browse a GitHub repository',
    steps: [
      { name: 'Navigate', ab: ['open', 'https://github.com/anthropics/anthropic-cookbook'], mcp: { tool: 'browser_navigate', args: { url: 'https://github.com/anthropics/anthropic-cookbook' } } },
      { name: 'Snapshot', ab: ['snapshot', '-i'], mcp: { tool: 'browser_snapshot', args: {} } },
      { name: 'Get URL', ab: ['get', 'url'], mcp: { tool: 'browser_snapshot', args: {} } },
      { name: 'Eval (stars)', ab: ['eval', 'document.querySelector("#repo-stars-counter-star")?.textContent'], mcp: { tool: 'browser_snapshot', args: {} } },
      { name: 'Snapshot 2', ab: ['snapshot', '-i'], mcp: { tool: 'browser_snapshot', args: {} } },
    ],
  },
  {
    name: 'Hacker News',
    description: 'Browse Hacker News front page',
    steps: [
      { name: 'Navigate', ab: ['open', 'https://news.ycombinator.com'], mcp: { tool: 'browser_navigate', args: { url: 'https://news.ycombinator.com' } } },
      { name: 'Snapshot', ab: ['snapshot', '-i'], mcp: { tool: 'browser_snapshot', args: {} } },
      { name: 'Eval (count)', ab: ['eval', 'document.querySelectorAll(".athing").length'], mcp: { tool: 'browser_snapshot', args: {} } },
      { name: 'Snapshot 2', ab: ['snapshot', '-i'], mcp: { tool: 'browser_snapshot', args: {} } },
      { name: 'Get title', ab: ['get', 'title'], mcp: { tool: 'browser_snapshot', args: {} } },
    ],
  },
];

// ============================================================================
// Run Benchmarks
// ============================================================================

async function runAgentBrowser(workflow: Workflow, session: string): Promise<void> {
  // Cleanup
  try { runAB(['close'], session); } catch {}
  await sleep(100);

  for (const step of workflow.steps) {
    const r = runAB(step.ab, session);
    results.push({
      tool: 'agent-browser',
      workflow: workflow.name,
      operation: step.name,
      timeMs: r.ms,
      outputBytes: r.output.length,
    });
  }
  
  try { runAB(['close'], session); } catch {}
}

async function runPlaywrightMCP(workflow: Workflow): Promise<void> {
  let client: MCPClient | null = null;
  try {
    client = await createMCPClient();
    
    for (const step of workflow.steps) {
      const r = await client.call(step.mcp.tool, step.mcp.args);
      results.push({
        tool: 'playwright-mcp',
        workflow: workflow.name,
        operation: step.name,
        timeMs: r.ms,
        outputBytes: r.output.length,
      });
    }
    
    await client.call('browser_close', {});
  } catch (e) {
    console.log(`  ⚠ MCP error: ${e}`);
  } finally {
    client?.close();
  }
}

// ============================================================================
// Reporting
// ============================================================================

function printResults(): void {
  console.log('\n' + '═'.repeat(80));
  console.log('📊 DETAILED RESULTS');
  console.log('═'.repeat(80));

  for (const workflow of workflows) {
    console.log(`\n📋 ${workflow.name}`);
    console.log('─'.repeat(70));
    console.log('│ Operation          │ agent-browser │ playwright-mcp │ Diff      │');
    console.log('├────────────────────┼───────────────┼────────────────┼───────────┤');

    let abTotal = 0, mcpTotal = 0;

    for (const step of workflow.steps) {
      const ab = results.find(r => r.tool === 'agent-browser' && r.workflow === workflow.name && r.operation === step.name);
      const mcp = results.find(r => r.tool === 'playwright-mcp' && r.workflow === workflow.name && r.operation === step.name);

      const abTime = ab?.timeMs || 0;
      const mcpTime = mcp?.timeMs || 0;
      abTotal += abTime;
      mcpTotal += mcpTime;

      const diff = mcpTime - abTime;
      const diffStr = diff > 0 ? `+${formatTime(diff)}` : formatTime(diff);

      console.log(`│ ${step.name.padEnd(18)} │ ${formatTime(abTime).padEnd(13)} │ ${formatTime(mcpTime).padEnd(14)} │ ${diffStr.padEnd(9)} │`);
    }

    console.log('├────────────────────┼───────────────┼────────────────┼───────────┤');
    const totalDiff = mcpTotal - abTotal;
    const totalDiffStr = totalDiff > 0 ? `+${formatTime(totalDiff)}` : formatTime(totalDiff);
    console.log(`│ ${'TOTAL'.padEnd(18)} │ ${formatTime(abTotal).padEnd(13)} │ ${formatTime(mcpTotal).padEnd(14)} │ ${totalDiffStr.padEnd(9)} │`);
    console.log('└────────────────────┴───────────────┴────────────────┴───────────┘');
  }

  // Summary
  const abTotalAll = results.filter(r => r.tool === 'agent-browser').reduce((s, r) => s + r.timeMs, 0);
  const mcpTotalAll = results.filter(r => r.tool === 'playwright-mcp').reduce((s, r) => s + r.timeMs, 0);
  const abOps = results.filter(r => r.tool === 'agent-browser').length;
  const mcpOps = results.filter(r => r.tool === 'playwright-mcp').length;

  console.log('\n' + '═'.repeat(80));
  console.log('📈 SUMMARY');
  console.log('═'.repeat(80));
  console.log(`\n  Workflows tested: ${workflows.length}`);
  console.log(`  Total operations: ${abOps} (agent-browser), ${mcpOps} (playwright-mcp)`);
  console.log(`\n  agent-browser total:  ${formatTime(abTotalAll)} (${(abTotalAll / abOps).toFixed(0)}ms avg/op)`);
  console.log(`  playwright-mcp total: ${formatTime(mcpTotalAll)} (${(mcpTotalAll / mcpOps).toFixed(0)}ms avg/op)`);
  
  if (abTotalAll < mcpTotalAll) {
    console.log(`\n  ✅ agent-browser is ${((mcpTotalAll - abTotalAll) / 1000).toFixed(2)}s faster overall`);
  } else {
    console.log(`\n  ⏱️  playwright-mcp is ${((abTotalAll - mcpTotalAll) / 1000).toFixed(2)}s faster overall`);
  }

  // Context usage
  const abBytes = results.filter(r => r.tool === 'agent-browser').reduce((s, r) => s + r.outputBytes, 0);
  const mcpBytes = results.filter(r => r.tool === 'playwright-mcp').reduce((s, r) => s + r.outputBytes, 0);
  
  console.log(`\n  Context usage:`);
  console.log(`    agent-browser:  ${formatBytes(abBytes)} (~${Math.ceil(abBytes / 4)} tokens)`);
  console.log(`    playwright-mcp: ${formatBytes(mcpBytes)} (~${Math.ceil(mcpBytes / 4)} tokens)`);

  console.log('\n' + '═'.repeat(80));
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

// ============================================================================
// Main
// ============================================================================

async function main(): Promise<void> {
  console.log('═'.repeat(80));
  console.log('🚀 COMPREHENSIVE BENCHMARK: agent-browser vs playwright-mcp');
  console.log('═'.repeat(80));
  console.log('\nWorkflows:');
  for (const w of workflows) {
    console.log(`  • ${w.name}: ${w.description} (${w.steps.length} steps)`);
  }

  console.log('\n🔨 Building...');
  execSync('pnpm build', { cwd: process.cwd(), stdio: 'inherit' });

  for (const workflow of workflows) {
    console.log(`\n${'─'.repeat(80)}`);
    console.log(`📋 Running: ${workflow.name}`);
    console.log('─'.repeat(80));

    console.log('\n  agent-browser:');
    await runAgentBrowser(workflow, `ab-${workflow.name.toLowerCase().replace(/\s+/g, '-')}`);
    const abTime = results.filter(r => r.tool === 'agent-browser' && r.workflow === workflow.name).reduce((s, r) => s + r.timeMs, 0);
    console.log(`    ✓ Completed in ${formatTime(abTime)}`);

    console.log('\n  playwright-mcp:');
    await runPlaywrightMCP(workflow);
    const mcpTime = results.filter(r => r.tool === 'playwright-mcp' && r.workflow === workflow.name).reduce((s, r) => s + r.timeMs, 0);
    console.log(`    ✓ Completed in ${formatTime(mcpTime)}`);
  }

  printResults();
}

main().catch(console.error);
