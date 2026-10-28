<script setup>
import { ref } from 'vue'
defineProps({ photos: { type: Array, required: true }, documents: Boolean })
const dialog = ref(null)
const selected = ref(null)
function openPhoto(photo, event) {
  if (!dialog.value?.showModal) return
  event.preventDefault()
  selected.value = photo
  dialog.value.showModal()
}
</script>

<template>
  <section class="container gallery-section" aria-labelledby="gallery-title">
    <div class="section-heading">
      <span class="eyebrow">Uno sguardo da vicino</span>
      <h2 id="gallery-title">La nostra galleria</h2>
      <p>Seleziona una fotografia per ingrandirla.</p>
    </div>
    <div class="gallery-grid" :class="{ 'document-grid': documents }">
      <a
        v-for="photo in photos"
        :key="photo.src"
        :href="photo.src"
        @click="openPhoto(photo, $event)"
        ><img :src="photo.src" :alt="photo.alt" loading="lazy" width="800" height="600"
      /></a>
    </div>
    <dialog
      ref="dialog"
      class="lightbox"
      aria-label="Immagine ingrandita"
      @click="(event) => event.target === dialog && dialog.close()"
    >
      <button autofocus class="button" @click="dialog.close()">Chiudi fotografia ×</button>
      <figure v-if="selected">
        <img :src="selected.src" :alt="selected.alt" />
        <figcaption>{{ selected.alt }}</figcaption>
      </figure>
    </dialog>
  </section>
</template>
