import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { pages } from '../src/data/pages.js'
import { site } from '../src/data/site.js'
const routes = new Set(pages.map((page) => page.path))
for (const page of pages) {
  const html = await readFile(`dist${page.path === '/' ? '' : page.path}/index.html`, 'utf8')
  assert.equal((html.match(/<h1\b/g) || []).length, 1, page.path)
  assert(html.includes(`href="${site.origin}${page.path}"`), `Canonical: ${page.path}`)
  assert(!html.includes('noindex'), `Indexable: ${page.path}`)
  assert(html.includes(page.heading), `Prerendered: ${page.path}`)
  for (const [, target] of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    if (routes.has(target)) continue
    await access(`dist${target}`)
  }
  for (const [, target, anchor] of html.matchAll(/href="(\/[^"#]*)#([^"#]+)"/g)) {
    const targetHtml = await readFile(`dist${target === '/' ? '' : target}/index.html`, 'utf8')
    assert(targetHtml.includes(`id="${anchor}"`), `Missing anchor ${target}#${anchor}`)
  }
}
const oldSitemap = await readFile('docs/audit/original-sitemap.xml', 'utf8')
for (const [, url] of oldSitemap.matchAll(/<loc>(.*?)<\/loc>/g))
  assert(routes.has(new URL(url).pathname), `Original URL missing: ${url}`)
assert((await readFile('dist/404.html', 'utf8')).includes('noindex'))
console.log(
  `Verified ${pages.length} prerendered pages, original URLs, canonical tags, internal links, anchors and assets.`,
)
