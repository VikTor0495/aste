<script setup>
import { site } from '../data/site'
</script>

<template>
  <section id="contatti" class="contact-panel container" aria-labelledby="contact-title">
    <div>
      <span class="eyebrow">Siamo qui per ascoltarti</span>
      <h2 id="contact-title">Una domanda, una visita.<br />Il primo passo è parlarne.</h2>
      <p>
        Contattaci per conoscere la residenza, le modalità di ingresso e la disponibilità attuale.
      </p>
    </div>
    <address>
      <a class="contact-phone" :href="site.phoneLink">{{ site.phone }}</a
      ><a :href="`mailto:${site.email}`">{{ site.email }}</a
      ><span>{{ site.address }}</span
      ><a :href="site.map">Indicazioni stradali ↗</a>
    </address>
  </section>
</template>
