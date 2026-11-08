import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let url;
  try {
    url = decodeURI(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }
  if (url === '/Portfolio') url = '/Portfolio/';
  if (url.startsWith('/Portfolio/')) url = url.substring('/Portfolio'.length);
  const reqPath = path.resolve(root, '.' + (url === '/' ? '/index.html' : url));
  if (!reqPath.startsWith(root + path.sep) && reqPath !== path.join(root, 'index.html')) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(reqPath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(reqPath)] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(port, () => console.log('Preview http://localhost:' + port + '/Portfolio/'));

