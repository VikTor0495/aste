import { readFile, writeFile, mkdir, cp } from 'node:fs/promises'
import { dirname } from 'node:path'
import { pages, getPage, site, aliases, render } from '../.ssr/entry-server.js'
const template = await readFile('dist/index.html', 'utf8')
import { pageMetadata } from './metadata.mjs'
for (const page of [...pages, getPage('/404')]) {
  const metadata = pageMetadata(page, site)
  const file = page.notFound
    ? 'dist/404.html'
    : `dist${page.path === '/' ? '' : page.path}/index.html`
  await mkdir(dirname(file), { recursive: true })
  await writeFile(
    file,
    template.replace('<!--seo-->', metadata).replace('<!--app-->', await render(page)),
  )
}
await cp('images', 'dist/images', { recursive: true })
await cp('logo.png', 'dist/logo.png')
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page) => `<url><loc>${site.origin}${page.path}</loc></url>`).join('')}</urlset>`,
)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`)
await writeFile(
  'dist/_redirects',
  Object.entries(aliases)
    .map(([from, to]) => `${from} ${to} 301`)
    .join('\n') + '\n',
)
console.log(`Generated ${pages.length} pages, 404, sitemap, robots and redirects.`)
