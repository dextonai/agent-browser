import type { Page } from 'playwright-core';
import type { DiffSnapshotData, DiffScreenshotData } from './types.js';
import { readFileSync } from 'node:fs';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// --- Text diffing (Myers algorithm, line-level) ---

interface DiffEdit {
  type: 'equal' | 'insert' | 'delete';
  line: string;
}

/**
 * Myers diff algorithm operating on arrays of lines.
 * Returns a minimal edit script.
 */
function myersDiff(a: string[], b: string[]): DiffEdit[] {
  const n = a.length;
  const m = b.length;
  const max = n + m;

  if (max === 0) return [];

  // Optimize: if both are identical, skip diff
  if (n === m) {
    let identical = true;
    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) {
        identical = false;
        break;
      }
    }
    if (identical) return a.map((line) => ({ type: 'equal' as const, line }));
  }

  const vSize = 2 * max + 1;
  const v = new Int32Array(vSize);
  v.fill(-1);
  const trace: Int32Array[] = [];

  v[max + 1] = 0;
  for (let d = 0; d <= max; d++) {
    const snapshot = new Int32Array(v);
    trace.push(snapshot);

    for (let k = -d; k <= d; k += 2) {
      const idx = k + max;
      let x: number;
      if (k === -d || (k !== d && v[idx - 1] < v[idx + 1])) {
        x = v[idx + 1];
      } else {
        x = v[idx - 1] + 1;
      }
      let y = x - k;

      while (x < n && y < m && a[x] === b[y]) {
        x++;
        y++;
      }

      v[idx] = x;

      if (x >= n && y >= m) {
        return buildEditScript(trace, a, b, max);
      }
    }
  }

  return buildEditScript(trace, a, b, max);
}

function buildEditScript(trace: Int32Array[], a: string[], b: string[], max: number): DiffEdit[] {
  const edits: DiffEdit[] = [];
  let x = a.length;
  let y = b.length;

  for (let d = trace.length - 1; d > 0; d--) {
    const v = trace[d - 1];
    const k = x - y;
    const idx = k + max;

    let prevK: number;
    if (k === -d || (k !== d && v[idx - 1] < v[idx + 1])) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }

    const prevIdx = prevK + max;
    let prevX = v[prevIdx];
    let prevY = prevX - prevK;

    // Diagonal (equal lines)
    while (x > prevX && y > prevY) {
      x--;
      y--;
      edits.push({ type: 'equal', line: a[x] });
    }

    if (d > 0) {
      if (x === prevX) {
        // Insertion
        y--;
        edits.push({ type: 'insert', line: b[y] });
      } else {
        // Deletion
        x--;
        edits.push({ type: 'delete', line: a[x] });
      }
    }
  }

  // Remaining diagonal at d=0
  while (x > 0 && y > 0) {
    x--;
    y--;
    edits.push({ type: 'equal', line: a[x] });
  }

  edits.reverse();
  return edits;
}

/**
 * Produce a unified diff string and stats from two snapshot texts.
 */
export function diffSnapshots(before: string, after: string): DiffSnapshotData {
  const linesA = before.split('\n');
  const linesB = after.split('\n');

  const edits = myersDiff(linesA, linesB);

  let additions = 0;
  let removals = 0;
  let unchanged = 0;
  const diffLines: string[] = [];

  for (const edit of edits) {
    switch (edit.type) {
      case 'equal':
        unchanged++;
        diffLines.push(`  ${edit.line}`);
        break;
      case 'insert':
        additions++;
        diffLines.push(`+ ${edit.line}`);
        break;
      case 'delete':
        removals++;
        diffLines.push(`- ${edit.line}`);
        break;
    }
  }

  return {
    diff: diffLines.join('\n'),
    additions,
    removals,
    unchanged,
    changed: additions > 0 || removals > 0,
  };
}

// --- Image diffing (via browser Canvas API) ---

interface PixelDiffResult {
  totalPixels: number;
  differentPixels: number;
  mismatchPercentage: number;
  diffBase64: string;
  dimensionMismatch: boolean;
}

/**
 * Compare a baseline image file against a current screenshot buffer,
 * using the browser's Canvas API for pixel comparison.
 */
export async function diffScreenshots(
  page: Page,
  baselinePath: string,
  currentBuffer: Buffer,
  opts: { threshold?: number; outputPath?: string }
): Promise<DiffScreenshotData> {
  const baselineBuffer = readFileSync(baselinePath);
  const baselineB64 = baselineBuffer.toString('base64');
  const currentB64 = currentBuffer.toString('base64');

  const baselineExt = path.extname(baselinePath).toLowerCase();
  const baselineMime =
    baselineExt === '.jpg' || baselineExt === '.jpeg' ? 'image/jpeg' : 'image/png';

  const threshold = opts.threshold ?? 0.1;

  // Runs entirely in the browser context via page.evaluate().
  // Uses a JS string to avoid TypeScript DOM type-checking issues.
  const args = JSON.stringify({ baselineB64, currentB64, baselineMime, threshold });
  const result: PixelDiffResult = await page.evaluate(`(async () => {
    const { baselineB64, currentB64, baselineMime, threshold } = ${args};
    function loadImage(dataUrl) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = dataUrl;
      });
    }
    const [imgA, imgB] = await Promise.all([
      loadImage('data:' + baselineMime + ';base64,' + baselineB64),
      loadImage('data:image/png;base64,' + currentB64),
    ]);
    if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
      const c = document.createElement('canvas');
      c.width = 1;
      c.height = 1;
      return {
        totalPixels: Math.max(imgA.width * imgA.height, imgB.width * imgB.height),
        differentPixels: Math.max(imgA.width * imgA.height, imgB.width * imgB.height),
        mismatchPercentage: 100,
        diffBase64: c.toDataURL('image/png').split(',')[1],
        dimensionMismatch: true,
      };
    }
    const w = imgA.width;
    const h = imgA.height;
    const canvasA = document.createElement('canvas');
    canvasA.width = w;
    canvasA.height = h;
    const ctxA = canvasA.getContext('2d');
    ctxA.drawImage(imgA, 0, 0);
    const dataA = ctxA.getImageData(0, 0, w, h).data;
    const canvasB = document.createElement('canvas');
    canvasB.width = w;
    canvasB.height = h;
    const ctxB = canvasB.getContext('2d');
    ctxB.drawImage(imgB, 0, 0);
    const dataB = ctxB.getImageData(0, 0, w, h).data;
    const diffCanvas = document.createElement('canvas');
    diffCanvas.width = w;
    diffCanvas.height = h;
    const ctxDiff = diffCanvas.getContext('2d');
    const diffImageData = ctxDiff.createImageData(w, h);
    const diffData = diffImageData.data;
    const maxColorDistance = threshold * 255 * Math.sqrt(3);
    let differentPixels = 0;
    const totalPixels = w * h;
    for (let i = 0; i < totalPixels; i++) {
      const offset = i * 4;
      const rA = dataA[offset], gA = dataA[offset+1], bA = dataA[offset+2];
      const rB = dataB[offset], gB = dataB[offset+1], bB = dataB[offset+2];
      const dr = rA - rB, dg = gA - gB, db = bA - bB;
      const dist = Math.sqrt(dr*dr + dg*dg + db*db);
      if (dist > maxColorDistance) {
        differentPixels++;
        diffData[offset] = 255;
        diffData[offset+1] = 0;
        diffData[offset+2] = 0;
        diffData[offset+3] = 255;
      } else {
        diffData[offset] = Math.round(rA * 0.3);
        diffData[offset+1] = Math.round(gA * 0.3);
        diffData[offset+2] = Math.round(bA * 0.3);
        diffData[offset+3] = 255;
      }
    }
    ctxDiff.putImageData(diffImageData, 0, 0);
    const diffBase64 = diffCanvas.toDataURL('image/png').split(',')[1];
    return {
      totalPixels,
      differentPixels,
      mismatchPercentage: Math.round((differentPixels / totalPixels) * 10000) / 100,
      diffBase64,
      dimensionMismatch: false,
    };
  })()`);

  let outputPath = opts.outputPath;
  if (!outputPath) {
    const tmpDir = path.join(
      process.env.HOME || process.env.USERPROFILE || '/tmp',
      '.agent-browser',
      'tmp',
      'diffs'
    );
    await mkdir(tmpDir, { recursive: true });
    outputPath = path.join(tmpDir, `diff-${Date.now()}.png`);
  }

  const diffBuffer = Buffer.from(result.diffBase64, 'base64');
  await writeFile(outputPath, diffBuffer);

  return {
    diffPath: outputPath,
    totalPixels: result.totalPixels,
    differentPixels: result.differentPixels,
    mismatchPercentage: result.mismatchPercentage,
    match: result.differentPixels === 0,
    ...(result.dimensionMismatch ? { dimensionMismatch: true } : {}),
  };
}
