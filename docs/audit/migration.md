# Migrazione Vue: analisi iniziale

## Stato verificato

Il checkout contiene cinque pagine HTML, CSS e JavaScript condivisi, senza build system. Le fotografie e il logo sono disponibili localmente. Il form simula l'invio: occorre sostituirlo con un contatto realmente utilizzabile, senza messaggi di successo fittizi. Le testimonianze nominali e gli orari locali non sono ancora confermati dal sito originale.

La sitemap originale, consultata il 28 ottobre 2026, elenca otto URL da preservare:

- `/`
- `/la-struttura`
- `/servizi`
- `/servizi/animazione-gallery`
- `/servizi/giardino-gallery`
- `/camere-gallery`
- `/soddisfazione-clienti`
- `/contatti`

Il dominio dichiarato nella sitemap è `https://www.casadiriposoaste.com`. I quattro URL locali delle gallerie dovranno essere reindirizzati verso gli equivalenti originali. Il posizionamento non è verificabile senza Search Console; preservare gli elementi tecnici non garantisce posizioni immutate.

## UX/UI e contenuti

Mantenere logo, fotografie, colori verdi, informazioni locali e collegamenti telefonici. Semplificare la navigazione coerentemente tra home e pagine interne; offrire collegamenti visibili alle otto pagine. Migliorare gerarchia tipografica, focus, navigazione da tastiera e gallerie senza avanzamento automatico. I contenuti devono restare visibili senza JavaScript.

Correggere «24 posti disponibili»: le 11 camere doppie e 2 singole descrivono la capienza, non la disponibilità corrente. Il checkout indica quattro infermiere, il sito originale tre: evitare numeri non confermati. Conservare i riferimenti storici all'accreditamento senza presentarli come verifiche attuali. Recuperare documenti e informazioni di trasparenza presenti nell'originale.

## Architettura prevista

Vue con rendering statico delle pagine, metadati specifici e idratazione delle interazioni. Componenti condivisi per intestazione, navigazione, footer, contatti, sezioni e galleria; dati editoriali separati. Nessuna necessità di store globale o backend applicativo per le pagine informative. Build con sitemap, robots, canonical e pagina 404; documentare i redirect da applicare all'hosting reale.

## Verifiche ancora da eseguire

Completare inventario dei metadati, documenti, policy e contenuti originali; implementare; compilare; controllare HTML generato, URL, asset e link; verificare layout e interazioni su desktop e mobile. Deployment e verifica Search Console richiedono il contesto dell'hosting reale e non sono stati eseguiti.

## Avanzamento verificato

Implementate otto pagine Vue con prerendering, componenti condivisi, dati centralizzati, sitemap, canonical, Organization JSON-LD, 404 e cinque redirect locali. Build e controllo statico degli otto URL, link, ancore e asset superati. Rimossi i vecchi HTML/CSS/JS duplicati; `README.md` contiene avvio e requisiti di hosting.

Chrome: home verificata a viewport desktop e 390×844; menu mobile, navigazione camere, apertura foto, Escape e restituzione del focus verificati. La preview è stata avviata sulla porta 4173. Le modifiche successive ai collegamenti del footer richiedono una build finale.

Privacy originale recuperata nel popup del sito: `https://sites-policies.italiaonline.it/cookie-policy.html?spon=2350741&alias=a2ae613c&url=www.casadiriposoaste.com`. Collegamento conservato; la policy è del fornitore esistente e il titolare dovrà verificarne l’adeguatezza al nuovo hosting.

Ancora da completare: audit finale di contenuti e metadati rispetto al sito originale, verifica dei grafici di soddisfazione, qualità/leggibilità dei file e testo alternativo delle immagini, verifica HTTP redirect/404, aggiornamento delle istruzioni obsolete in CLAUDE.md e riepilogo finale. Il sito non è stato pubblicato.

## Audit finale del rifacimento locale

| Requisito | Evidenza |
| --- | --- |
| Analisi prima dell'implementazione | Sezioni iniziali di questo documento, inventario e sitemap originale |
| Vue e riuso | `src/App.vue`, quattro componenti condivisi; pagine e recapiti in `src/data/` |
| Codice leggibile | File formattati con Prettier; metadati estratti in `scripts/metadata.mjs`; vecchi HTML/CSS/JS eliminati |
| URL originali | Tutti gli otto percorsi della sitemap presenti; confronto automatico in `npm run check` |
| HTML indicizzabile | Prerendering Vue delle otto pagine, verificato prima dell'esecuzione client |
| Metadati | Title originali conservati (soddisfazione arricchito con ASTE Terni); description uniche; canonical, Open Graph e schema WebSite originale più Organization |
| Contenuti | Temi di assistenza, fisioterapia, alimentazione, animazione, camere e giardino conservati; riferimenti storici, contributi pubblici e documenti mantenuti |
| Accuratezza | Rimossi recensioni nominali non documentate, orari non confermati e invio fittizio; capienza distinta dalla disponibilità; organico presentato per ruoli |
| Gallerie e accessibilità | Dialog nativo, Escape e focus verificati in Chrome; immagini apribili anche senza JavaScript; testi, focus e gerarchia semantica presenti |
| Mobile | Home controllata a 390×844, menu e navigazione verificati; griglie responsive |
| Soddisfazione | Originali esaminati visivamente; nessuna stima decimale; descrizione testuale e immagini intere senza ritaglio |
| Collegamenti documentali | Entrambi i PDF restituiscono HTTP 200; policy originale recuperata e collegata |
| Documentazione | README e CLAUDE.md aggiornati per il nuovo progetto |

`npm run build` e `npm run check` superati dopo le modifiche finali. Le fonti dei metadati sono registrate in `original-metadata.json`. Il precedente riferimento a verifiche ancora da svolgere descriveva lo stato intermedio.

### Limiti esterni al checkout

Non sono disponibili Search Console, dati di traffico, configurazione hosting e credenziali di produzione. Pertanto non sono verificati posizionamento, URL fuori dalla sitemap, backlink, redirect del dominio reale e Core Web Vitals di produzione. Nessuna pubblicazione è stata eseguita. I redirect del server e la policy del fornitore vanno adattati all'hosting effettivamente scelto. Non si inventano dati su disponibilità, organici attuali o validità corrente degli accreditamenti.

Verifica HTTP finale sulla preview: tutte le otto pagine restituiscono 200 e contengono il relativo titolo principale; tutti i cinque alias restituiscono 301 con destinazione corretta; un percorso inesistente restituisce 404. `git diff --check` superato.


## Vercel

`vercel.json` dichiara la build `npm run build`, output `dist` e cinque redirect permanenti dagli URL `.html` del precedente progetto locale. La configurazione è presente nel repository e la build/check locali passano. Il deployment Vercel e il collegamento del dominio non sono stati eseguiti.
