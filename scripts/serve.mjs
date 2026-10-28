import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import { aliases } from '../src/data/site.js'
const root = resolve('dist')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
}
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    if (aliases[pathname]) {
      response.writeHead(301, { Location: aliases[pathname] })
      response.end()
      return
    }
    let file = resolve(root, `.${pathname}`)
    if (!file.startsWith(root + '/') && file !== root) {
      response.writeHead(403)
      response.end()
      return
    }
    try {
      if ((await stat(file)).isDirectory()) file += '/index.html'
    } catch {
      file = root + '/404.html'
      response.statusCode = 404
    }
    response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream')
    response.end(await readFile(file))
  } catch {
    response.writeHead(500)
    response.end('Errore del server')
  }
}).listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'))
