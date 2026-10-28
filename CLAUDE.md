# ASTE — istruzioni di progetto

Sito informativo italiano per ASTE, Residenza Protetta per Anziani a Terni.

## Struttura

Vue 3 con Vite e generazione statica delle otto pagine originali. `src/data/pages.js` contiene contenuti e metadati; `src/data/site.js` centralizza recapiti, documenti e redirect. I componenti condivisi si trovano in `src/components/`. `src/style.css` definisce il design responsive mediante variabili CSS.

`src/entry-server.js` rende gli stessi componenti del client; `scripts/prerender.mjs` genera HTML, sitemap, robots e redirect dentro `dist/`. Pubblicare solo questa directory.

## Comandi

- `npm install`
- `npm run dev` per sviluppo.
- `npm run build` per generare le pagine statiche.
- `npm run check` dopo la build per URL originali, canonical, link, ancore e asset.
- `npm run preview` per preview di produzione su 127.0.0.1:4173, con redirect 301 e vere risposte 404.

## Vincoli

Conservare gli otto URL della sitemap originale, salvata in `docs/audit/original-sitemap.xml`. Il dominio canonico è https://www.casadiriposoaste.com. I contenuti principali devono esistere nell'HTML senza JavaScript. Le vecchie gallerie `.html` hanno redirect permanenti; non reintrodurre copie indipendenti.

Mantenere lingua italiana, contatti verificati e fotografie originali. Non inventare disponibilità, orari, recensioni o organici. I grafici di soddisfazione sono immagini originali: non dedurre valori decimali dall'estensione delle stelle. I riferimenti storici all'accreditamento devono mantenere le date.

I contatti usano telefono ed email. Non simulare invii di moduli. Per introdurre un servizio di invio occorrono integrazione reale e informativa adeguata. La policy del precedente fornitore è collegata nel footer e deve essere verificata dal titolare rispetto all'hosting scelto.

Preservare accessibilità: focus visibile, menu con stato espanso, dialog nativo con Escape e restituzione del focus, rispetto delle preferenze di movimento. Non nascondere testi in attesa di animazioni.

La configurazione HTTP/HTTPS e www/non-www dipende dall'hosting reale: vedere README. Non pubblicare o dichiarare preservato il posizionamento senza verifiche sulla produzione e Search Console.
