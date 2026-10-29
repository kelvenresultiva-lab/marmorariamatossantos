// Servidor local do site da Marmoraria Matos Stone (http://localhost:8964).
// Fica sempre ligado: é iniciado pelo atalho .vbs da pasta Inicializar do Windows.
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), port = 8964;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  // não sai da pasta do site nem serve a pasta .claude/.git
  if (!f.startsWith(root + path.sep) || /[\\/]\.(claude|git)([\\/]|$)/.test(f)) { res.writeHead(404); return res.end('404'); }
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); return res.end('404'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(d);
  });
}).listen(port, '127.0.0.1', () => console.log('http://localhost:' + port));
