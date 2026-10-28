export function escapeHtml(text) {
  return text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

export function pageMetadata(page, site) {
  const canonical = site.origin + page.path
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${site.origin}/#website`,
      name: site.name,
      url: `${site.origin}/`,
    },
    {
      '@type': 'Organization',
      '@id': `${site.origin}/#organization`,
      name: site.name,
      url: site.origin,
      telephone: site.phone,
      email: site.email,
      logo: `${site.origin}/logo.png`,
      sameAs: [site.facebook],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Via Salice, 6/A',
        postalCode: '05100',
        addressLocality: 'Terni',
        addressCountry: 'IT',
      },
    },
  ]
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll(
    '<',
    '\\u003c',
  )
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}">`,
    page.notFound
      ? '<meta name="robots" content="noindex">'
      : `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:title" content="${escapeHtml(page.title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="it_IT">',
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${site.origin}${page.image || '/logo.png'}">`,
    `<script type="application/ld+json">${schema}</script>`,
  ].join('\n')
}
