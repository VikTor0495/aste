<script setup>
import { pages } from '../data/pages'
import { site, documents } from '../data/site'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <img src="/logo.png" alt="ASTE" width="140" height="70" />
        <p>Dal 1985, a Terni.<br />Al fianco degli anziani e delle loro famiglie.</p>
        <a :href="site.facebook">Seguici su Facebook ↗</a>
      </div>
      <div>
        <h2>La residenza</h2>
        <a v-for="page in pages" :key="page.path" :href="page.path">{{ page.label }}</a>
      </div>
      <div>
        <h2>Informazioni</h2>
        <a href="/contatti#LavoraconNoi">Lavora con noi</a
        ><a v-for="document in documents" :key="document.href" :href="document.href"
          >{{ document.label }} (PDF) ↗</a
        ><a href="/la-struttura#trasparenza">Trasparenza</a
        ><a :href="site.privacy">Privacy e cookie policy ↗</a>
        <p>{{ site.address }}<br />P. IVA {{ site.vat }}</p>
      </div>
    </div>
    <div class="container footer-bottom">{{ site.name }}</div>
  </footer>
</template>
