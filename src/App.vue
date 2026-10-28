<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import ContactPanel from './components/ContactPanel.vue'
import PhotoGallery from './components/PhotoGallery.vue'
import { pages } from './data/pages'
defineProps({ page: { type: Object, required: true } })
</script>

<template>
  <SiteHeader :current-path="page.path" />
  <main id="contenuto" tabindex="-1">
    <section
      class="hero container"
      :class="{ 'hero-home': page.path === '/', 'hero-text-only': !page.image }"
    >
      <div class="hero-copy">
        <a v-if="page.path !== '/'" class="breadcrumb" href="/">Home / {{ page.label }}</a
        ><span class="eyebrow">{{ page.eyebrow }}</span>
        <h1>{{ page.heading }}</h1>
        <p class="intro">{{ page.intro }}</p>
        <div class="actions">
          <a class="button" href="/contatti">Parla con noi ↗</a
          ><a v-if="page.path === '/'" class="text-link" href="/la-struttura"
            >Scopri la residenza →</a
          ><a v-if="page.notFound" class="text-link" href="/">Torna alla home →</a>
        </div>
      </div>
      <div v-if="page.image" class="hero-photo">
        <img
          :src="page.image"
          :alt="page.imageAlt"
          width="1000"
          height="900"
          fetchpriority="high"
        /><span>ASTE · Terni, dal 1985</span>
      </div>
    </section>
    <div v-if="page.path === '/'" class="facts">
      <div class="container">
        <span><strong>Dal 1985</strong> al fianco delle famiglie</span
        ><span><strong>24 ospiti</strong> capienza della residenza</span
        ><span><strong>A Terni</strong> in Via Salice, 6/A</span>
      </div>
    </div>
    <section
      v-for="(section, index) in page.sections"
      :id="section.id || (section.title.startsWith('Trasparenza') ? 'trasparenza' : undefined)"
      :key="section.title"
      class="content-section container"
    >
      <span class="section-number">0{{ index + 1 }}</span>
      <h2>{{ section.title }}</h2>
      <div>
        <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        <a
          v-if="section.id === 'LavoraconNoi'"
          class="text-link"
          href="mailto:asteterni@gmail.com?subject=Lavora%20con%20noi"
          >Invia la tua candidatura via email ↗</a
        >
      </div>
    </section>
    <section v-if="page.path === '/' || page.path === '/servizi'" class="explore">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">La vita in residenza</span>
          <h2>Spazi, cure e momenti da condividere.</h2>
        </div>
        <div class="card-grid">
          <a
            v-for="item in pages.filter(
              (item) => item.gallery && item.path !== '/soddisfazione-clienti',
            )"
            :key="item.path"
            class="feature-card"
            :href="item.path"
            ><img :src="item.image" :alt="item.imageAlt" loading="lazy" width="600" height="440" />
            <div>
              <h3>{{ item.label }} <span aria-hidden="true">↗</span></h3>
              <p>{{ item.intro }}</p>
            </div></a
          >
        </div>
      </div>
    </section>
    <PhotoGallery
      v-if="page.gallery"
      :photos="page.gallery"
      :documents="page.path === '/soddisfazione-clienti'"
    />
    <ContactPanel />
  </main>
  <SiteFooter />
</template>
