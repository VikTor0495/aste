const gallery = (folder, prefix, count, label) =>
  Array.from({ length: count }, (_, index) => ({
    src: `/images/${folder}/${prefix}-${index + 1}.jpg`,
    alt: `${label} · fotografia ${index + 1}`,
  }))

export const pages = [
  {
    path: '/',
    label: 'Home',
    title: 'Casa di riposo | Terni | ASTE – Residenza Protetta per Anziani',
    description:
      'ASTE a Terni: dal 1985 assistenza per anziani non autosufficienti, fisioterapia, cucina interna e attività in un ambiente familiare.',
    heading: 'Una casa accogliente. Una cura familiare.',
    eyebrow: 'Residenza protetta per anziani · Terni',
    intro:
      'Dal 1985 siamo al fianco degli anziani non autosufficienti e delle loro famiglie, con assistenza qualificata e attenzione alla dignità di ogni persona.',
    image: '/images/struttura/struttura-10.jpg',
    imageAlt: 'La residenza ASTE a Terni',
    sections: [
      {
        id: 'chi-siamo',
        title: 'Assistenza agli anziani non autosufficienti a Terni',
        paragraphs: [
          'ASTE è una cooperativa sociale nata a Terni nel 1985. Accogliamo anziani non autosufficienti in un ambiente protetto, con attività e trattamenti dedicati al mantenimento e al miglioramento del benessere psicofisico.',
          'Il personale medico, infermieristico e di assistenza accompagna anche le famiglie nei momenti di difficoltà. Ogni ospite ha diritto a una vita dignitosa e alla maggiore autonomia possibile.',
        ],
      },
      {
        title: 'Un’équipe che si prende cura',
        paragraphs: [
          'Il Direttore Sanitario coordina il lavoro di infermiere e operatori socio-sanitari. Il programma di assistenza comprende il controllo quotidiano della salute e interventi tempestivi nelle urgenze diurne e notturne.',
          'La fisioterapista propone trattamenti quotidiani per la mobilità e la psicomotricità. L’animatrice organizza attività, notizie di attualità e momenti di convivialità; la cucina interna prepara menù stagionali sotto la supervisione del Direttore Sanitario. Una ditta esterna cura quotidianamente la pulizia degli ambienti.',
        ],
      },
      {
        title: 'Una presenza riconosciuta sul territorio',
        paragraphs: [
          'Iscritta all’Albo Regionale delle Cooperative Sociali dal 1995, ASTE è residenza protetta autorizzata con determinazione della Regione Umbria n. 6364 del 12 luglio 2002.',
          'Il sito della struttura riporta l’accreditamento istituzionale con D.D. n. 2153 del 2007, reiterato per il triennio 2017–2020, e la convenzione con USL Umbria 2. Per informazioni aggiornate sull’accesso, contatta la segreteria.',
        ],
      },
    ],
  },
  {
    path: '/la-struttura',
    label: 'La struttura',
    title: 'Camere per anziani | Terni | ASTE – Residenza Protetta',
    description:
      'Scopri la residenza ASTE a Terni: 11 camere doppie, 2 singole, spazi comuni e giardino accessibile per un’accoglienza familiare.',
    heading: 'Camere doppie e singole per anziani a Terni',
    eyebrow: 'La struttura',
    intro:
      'A Terni, 11 camere doppie e 2 singole accolgono fino a 24 ospiti. Ambienti comodi e funzionali, un giardino senza barriere e un’atmosfera familiare.',
    image: '/images/struttura/struttura-3.jpg',
    imageAlt: 'Ambienti della residenza ASTE',
    sections: [
      {
        title: 'Cura fisica e benessere psicologico',
        paragraphs: [
          'Il personale medico, paramedico e gli operatori lavorano per migliorare le condizioni degli ospiti. Alla fisioterapia individuale quotidiana si affiancano animazione e attività di psicomotricità, con attenzione alla salute fisica e psicologica.',
        ],
      },
      {
        title: 'Insieme alle famiglie e alla città',
        paragraphs: [
          'Le iniziative coinvolgono i familiari, i gruppi parrocchiali, le associazioni di volontariato e i gruppi musicali di Terni e provincia. Sono occasioni di apertura e scambio con la comunità, importanti per il benessere degli ospiti.',
        ],
      },
      {
        title: 'Trasparenza: contributi e aiuti ricevuti',
        paragraphs: [
          'Il sito originale pubblica i seguenti benefici, con rinvio al Registro Nazionale degli Aiuti di Stato ai sensi dell’art. 52 della L. 234/2012.',
          'COVID-19: Fondo di garanzia PMI, aiuto SA.56966 (2020/N), regime previsto dal D.L. 8 aprile 2020 n. 23 (GU n. 94 del 08/04/2020). Autorità concedente: Banca del Mezzogiorno – MedioCredito Centrale S.p.A. COR 2561394; importo € 25.000; concessione del 10/08/2020.',
          'Contributo 5 × 1000, anno 2020: € 305,91. Liquidazione piano FONCOOP R19A44-2019-0001455: € 1.759,80. Incentivo occupazione COR, L. 205/2017: € 2.557,70.',
        ],
      },
    ],
    gallery: gallery('struttura', 'struttura', 10, 'Ambienti della residenza ASTE a Terni'),
  },
  {
    path: '/servizi',
    label: 'Servizi',
    title: 'Assistenza sanitaria | Terni | ASTE – Residenza Protetta Anziani',
    description:
      'Assistenza agli anziani a Terni, fisioterapia quotidiana, psicomotricità e alimentazione personalizzata con cucina interna presso ASTE.',
    heading: 'Assistenza medica per la terza età a Terni',
    eyebrow: 'I nostri servizi',
    intro:
      'Il benessere degli ospiti guida l’assistenza medica e le attività quotidiane, rispettando le capacità cognitive e le condizioni fisiche di ciascuno.',
    image: '/images/servizi/fisioterapia-1.jpg',
    imageAlt: 'Fisioterapia presso ASTE',
    sections: [
      {
        title: 'Assistenza pensata per ogni persona',
        paragraphs: [
          'Il personale mette a disposizione esperienza nell’assistenza agli anziani con diverse patologie e competenze trasversali. I trattamenti sono mirati alle caratteristiche psicofisiche del singolo ospite.',
        ],
      },
      {
        title: 'Cucina interna e diete personalizzate',
        paragraphs: [
          'I piani alimentari tengono conto dei bisogni nutrizionali individuali. Le pietanze sono preparate nella cucina interna, con menù stagionali e diete equilibrate sotto la supervisione del Direttore Sanitario.',
        ],
      },
      {
        title: 'Fisioterapia e psicomotricità',
        paragraphs: [
          'I fisioterapisti qualificati svolgono trattamenti quotidiani, durante tutto l’anno, per mantenere e migliorare l’autonomia personale.',
          'Gli esercizi comprendono interventi sulla mobilità, sulla coordinazione degli arti superiori, sulla coordinazione oculo-manuale e sulla mobilità delle dita.',
        ],
      },
    ],
  },
  {
    path: '/servizi/animazione-gallery',
    label: 'Animazione',
    title: 'Intrattenimento | Terni | ASTE – Residenza Protetta per Anziani',
    description:
      'Animazione quotidiana per anziani a Terni: attività, compleanni e momenti di incontro per coltivare socialità e benessere presso ASTE.',
    heading: 'Animazione per anziani a Terni',
    eyebrow: 'Animazione',
    intro:
      'Ogni persona porta con sé una storia. Le attività giornaliere aiutano a custodirla, stimolando le capacità e gli interessi di ciascun ospite.',
    image: '/images/animazione/animazione-1.jpg',
    imageAlt: 'Attività di animazione nella residenza',
    sections: [
      {
        title: 'Restare parte della vita quotidiana',
        paragraphs: [
          'Compleanni, festività e attività condivise accompagnano la cura fisica con attenzione al benessere psicologico. Per chi può, sono anche un modo per mantenere il contatto con l’attualità e il mondo esterno.',
          'Le iniziative favoriscono la convivialità e l’incontro con le realtà sociali locali, coinvolgendo famiglie e comunità.',
        ],
      },
    ],
    gallery: gallery('animazione', 'animazione', 9, 'Attività e momenti di animazione ASTE'),
  },
  {
    path: '/servizi/giardino-gallery',
    label: 'Giardino',
    title: 'Area esterna | Terni | ASTE – Residenza Protetta per Anziani',
    description:
      'Il giardino della residenza ASTE a Terni: spazi verdi accessibili, passeggiate e attività all’aperto con vista sul Colleluna.',
    heading: 'Una residenza con giardino a Terni',
    eyebrow: 'Il giardino',
    intro:
      'Un giardino accessibile, il fresco degli alberi e la vista sul Colleluna: uno spazio tranquillo per trascorrere insieme le giornate più calde.',
    image: '/images/giardino/giardino-1.jpg',
    imageAlt: 'Giardino della residenza ASTE',
    sections: [
      {
        title: 'Verde da vivere',
        paragraphs: [
          'Il giardino circonda la struttura e offre agli ospiti la possibilità di passeggiare e partecipare ad attività all’aperto, comprese quelle di animazione. Gli spazi senza barriere architettoniche sono parte dell’accoglienza della residenza.',
        ],
      },
    ],
    gallery: gallery('giardino', 'giardino', 2, 'Giardino ASTE a Terni'),
  },
  {
    path: '/camere-gallery',
    label: 'Camere',
    title: 'Camere per disabili | Terni | ASTE – Residenza Protetta Anziani',
    description:
      'Le camere della residenza ASTE a Terni: 11 doppie e 2 singole attrezzate per anziani e persone con disabilità. Contattaci per la disponibilità.',
    heading: 'Camere per anziani e persone con disabilità a Terni',
    eyebrow: 'Le camere',
    intro:
      'Undici camere doppie e due singole, attrezzate e confortevoli, in un contesto raccolto che favorisce un’atmosfera familiare.',
    image: '/images/camere/camera-1.jpg',
    imageAlt: 'Camera della residenza protetta ASTE',
    sections: [
      {
        title: 'Accoglienza e accessibilità',
        paragraphs: [
          'Le camere e gli spazi esterni sono pensati per essere fruibili anche da ospiti con gravi disabilità. La residenza può accogliere fino a 24 persone.',
          'Per conoscere la disponibilità attuale e le modalità di ingresso, contatta direttamente la struttura.',
        ],
      },
    ],
    gallery: gallery('camere', 'camera', 5, 'Camera della residenza ASTE'),
  },
  {
    path: '/soddisfazione-clienti',
    label: 'Soddisfazione clienti',
    title: 'Soddisfazione clienti | ASTE Terni',
    description:
      'I risultati sulla soddisfazione degli ospiti e dei familiari della residenza protetta ASTE a Terni.',
    heading: 'Ascoltare per prendersi cura.',
    eyebrow: 'Soddisfazione clienti',
    intro:
      'I grafici riportano i dati sulla soddisfazione degli ospiti e dei familiari pubblicati dalla struttura.',
    sections: [
      {
        title: 'La voce di ospiti e familiari',
        paragraphs: [
          'Gli ospiti valutano ambiente, camera, cibo, assistenza e personale su una scala da 0 a 5. I familiari e i caregiver valutano anche accoglienza, informazioni, pulizia, visite, spostamenti, fisioterapia, animazione e soddisfazione complessiva.',
          'Le valutazioni rappresentate nei grafici sono superiori a quattro stelle su cinque; l’accoglienza dei familiari raggiunge cinque stelle. I grafici pubblicati non indicano data e numerosità del campione, né valori numerici decimali.',
        ],
      },
    ],
    gallery: [
      {
        src: '/images/servizi/soddisfazione-1.jpg',
        alt: 'Grafico sulla soddisfazione degli ospiti: apri per leggere i risultati',
      },
      {
        src: '/images/servizi/soddisfazione-2.jpg',
        alt: 'Grafico sulla soddisfazione dei familiari: apri per leggere i risultati',
      },
    ],
  },
  {
    path: '/contatti',
    label: 'Contatti',
    title: 'Fisioterapisti | Terni | ASTE – Residenza Protetta per Anziani',
    description:
      'Contatta ASTE a Terni: Via Salice 6/A, telefono 0744 300842, asteterni@gmail.com. Informazioni sull’accoglienza e sulle visite alla residenza.',
    heading: 'Parliamone insieme.',
    eyebrow: 'Contatti',
    intro:
      'Scegliere una residenza è un passo importante. Il nostro personale è a disposizione per informazioni sull’accoglienza e per concordare una visita in Via Salice, a Terni.',
    sections: [
      {
        id: 'LavoraconNoi',
        title: 'Lavora con noi',
        paragraphs: [
          'Per proporre la tua candidatura, scrivi alla struttura indicando nell’oggetto “Lavora con noi”.',
        ],
      },
    ],
  },
]

export function getPage(path) {
  return (
    pages.find((page) => page.path === path) ?? {
      path: '/404',
      label: 'Pagina non trovata',
      title: 'Pagina non trovata | ASTE',
      description: 'La pagina richiesta non è disponibile.',
      heading: 'Questa pagina non è disponibile.',
      intro: 'Puoi tornare alla home o contattare la struttura.',
      sections: [],
      notFound: true,
    }
  )
}
