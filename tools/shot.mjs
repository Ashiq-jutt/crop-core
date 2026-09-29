// Screenshot routes of the exported web build with exact 375pt phone emulation (via Chrome DevTools Protocol).
// Usage: node tools/shot.mjs <outDir> <route>[:height] [<route>[:height] ...]
// Env: APP_PORT (default 8099) = port of `python3 tools/spa_server.py <dist> <port>`;
//      CDP_PORT (default 9333) = Chrome debugging port (use a unique one per parallel run).
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = Number(process.env.CDP_PORT ?? 9333);
const APP_PORT = Number(process.env.APP_PORT ?? 8099);
const [outDir, ...targets] = process.argv.slice(2);
if (!outDir || targets.length === 0) {
  console.error('usage: node tools/shot.mjs <outDir> <route>[:height] ...');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const profile = mkdtempSync(join(tmpdir(), 'shot-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-component-update', '--disable-background-networking', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pageWsUrl() {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome did not start');
}

const ws = new WebSocket(await pageWsUrl());
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pending = new Map();
const errors = [];
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else if (msg.method === 'Runtime.exceptionThrown') {
    errors.push(msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text);
  } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
    errors.push(msg.params.args.map((a) => a.value ?? a.description).join(' '));
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

await send('Page.enable');
await send('Runtime.enable');

for (const target of targets) {
  const [route, h] = target.split(':');
  const height = Number(h ?? 812);
  errors.length = 0;
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height, deviceScaleFactor: 1, mobile: true });
  await send('Page.navigate', { url: `http://127.0.0.1:${APP_PORT}${route}` });
  await sleep(2500);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const file = join(outDir, `${route.replace(/^\//, '').replace(/[/?=&]/g, '_') || 'index'}.png`);
  writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
  console.log(file + (errors.length ? `  ERRORS: ${errors.join(' | ').slice(0, 400)}` : ''));
}

ws.close();
chrome.kill();
await new Promise((r) => chrome.once('exit', r));
try {
  rmSync(profile, { recursive: true, force: true });
} catch {
  // Chrome may still be flushing its profile; the OS temp dir is cleaned eventually.
}
process.exit(0);
