#!/usr/bin/env node
/**
 * Starts local API proxy on :8787 if not already running.
 * Hooked into `npm start` via prestart — iOS Simulator needs this for HTTP backend.
 */
const { spawn } = require('child_process');
const net = require('net');
const path = require('path');

const PORT = 8787;

const isPortOpen = () =>
  new Promise((resolve) => {
    const socket = net.connect({ port: PORT, host: '127.0.0.1' });
    socket.setTimeout(800);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => resolve(false));
  });

async function main() {
  if (process.env.SKIP_API_PROXY === '1') {
    return;
  }

  if (await isPortOpen()) {
    console.log(`[dev] API proxy already running on http://127.0.0.1:${PORT}`);
    return;
  }

  const proxyScript = path.join(__dirname, 'api-proxy.js');
  const child = spawn(process.execPath, [proxyScript], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();

  // brief wait for bind
  await new Promise((r) => setTimeout(r, 400));

  if (await isPortOpen()) {
    console.log(`[dev] API proxy started → http://127.0.0.1:${PORT} → http://52.66.158.37`);
  } else {
    console.warn('[dev] Could not start API proxy. Run manually: npm run api:proxy');
  }
}

main().catch((err) => {
  console.warn('[dev] ensure-proxy error:', err.message);
});
