#!/usr/bin/env node
/**
 * Dev proxy: iOS Simulator → http://127.0.0.1:8787 → http://52.66.158.37
 * Run: npm run api:proxy
 */
const http = require('http');
const { URL } = require('url');

const LISTEN_PORT = 8787;
const TARGET = 'http://52.66.158.37';

const server = http.createServer((req, res) => {
  const targetUrl = new URL(req.url || '/', TARGET);

  const headers = { ...req.headers, host: targetUrl.host };
  delete headers['content-length'];

  const proxyReq = http.request(
    {
      protocol: targetUrl.protocol,
      hostname: targetUrl.hostname,
      port: targetUrl.port || 80,
      path: targetUrl.pathname + targetUrl.search,
      method: req.method,
      headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );

  proxyReq.on('error', (err) => {
    console.error('[api-proxy] upstream error:', err.message);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: err.message }));
  });

  req.pipe(proxyReq);
});

server.listen(LISTEN_PORT, '0.0.0.0', () => {
  console.log(`[api-proxy] http://127.0.0.1:${LISTEN_PORT} → ${TARGET}`);
  console.log('[api-proxy] Keep this terminal open while developing on iOS Simulator');
});
