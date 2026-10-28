# ASTE — sito Vue

Sito multipagina in Vue 3 e Vite, con HTML prerenderizzato durante la build. Le pagine e i metadati sono in `src/data/pages.js`; contatti, documenti e redirect in `src/data/site.js`. Header, footer, contatti e galleria sono componenti riutilizzabili.

## Avvio

```sh
npm install
npm run dev
```

## Build e verifica

```sh
npm run build
npm run check
npm run preview
```

La preview di produzione è su http://127.0.0.1:4173. `dist/` contiene le otto pagine sugli URL originali, gli asset, sitemap, robots, 404 e redirect. La preview serve una vera risposta 404 per gli URL inesistenti e redirect 301 per le gallerie HTML precedenti.

## Pubblicazione

Pubblicare esclusivamente `dist/`. Configurare l'hosting per servire gli `index.html` delle directory senza cambiare gli URL canonici e usare `404.html` con status 404. `_redirects` è compatibile con hosting che supportano quel formato; su altri server tradurre le cinque regole in redirect HTTP 301. Non usare un fallback SPA con status 200 per pagine inesistenti. Il dominio canonico è `https://www.casadiriposoaste.com`; verificare sul server reale il redirect HTTP e non-www verso questo dominio, mantenendo percorso e query.

L'invio del vecchio form era simulato. Il nuovo sito permette contatti telefonici e via email reali; un modulo server richiederà un servizio di consegna e un'informativa adeguata. Non vengono incorporati mappe, font o widget esterni; Maps e Facebook sono collegamenti.

## SEO e limiti

L'inventario iniziale è in `docs/audit/`. La build genera title, description, canonical, Open Graph e dati strutturati WebSite e Organization per ogni pagina. I contenuti sono leggibili senza JavaScript. Il menu mobile e l'ingrandimento delle immagini richiedono JavaScript; le immagini restano collegamenti diretti.

Prima della pubblicazione verificare in Search Console la copertura effettiva degli URL, i backlink e le query rilevanti. Dopo il rilascio controllare redirect, status, sitemap, indicizzazione e prestazioni. I controlli locali non garantiscono il mantenimento delle posizioni nei risultati di ricerca.

Resta da confermare con la struttura l'attualità dei dati storici di accreditamento, degli organici e dei documenti pubblicati, e verificare l’informativa del fornitore originale, mantenuta come collegamento esterno: descrive i trattamenti del vecchio hosting e va adeguata dal titolare alla configurazione finale. Nessun deployment è stato eseguito.

Il codice è formattabile con `npm run format`. Le verifiche e le decisioni editoriali sono riepilogate in `docs/audit/migration.md`.
