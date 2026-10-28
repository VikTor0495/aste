<script setup>
import { ref } from 'vue'
import { pages } from '../data/pages'
import { site } from '../data/site'
defineProps({ currentPath: String })
const menuOpen = ref(false)
</script>

<template>
  <a class="skip-link" href="#contenuto">Vai al contenuto</a>
  <div class="contact-bar">
    <div class="container">
      <span>{{ site.address }}</span
      ><a :href="site.phoneLink">{{ site.phone }}</a>
    </div>
  </div>
  <header class="site-header">
    <div class="container header-row">
      <a href="/" class="brand" aria-label="ASTE, home"
        ><img src="/logo.png" alt="ASTE" width="160" height="80"
      /></a>
      <button
        class="menu-toggle"
        :aria-label="menuOpen ? 'Chiudi menu' : 'Apri menu'"
        :aria-expanded="menuOpen"
        aria-controls="navigation"
        @click="menuOpen = !menuOpen"
      >
        <span class="menu-icon" :class="{ open: menuOpen }" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
      </button>
      <nav
        id="navigation"
        aria-label="Navigazione principale"
        :class="{ open: menuOpen }"
        @keydown.esc="menuOpen = false"
      >
        <a
          v-for="page in pages.filter(
            (item) => item.path !== '/' && item.path !== '/soddisfazione-clienti',
          )"
          :key="page.path"
          :href="page.path"
          :aria-current="currentPath === page.path ? 'page' : undefined"
          @click="menuOpen = false"
          >{{ page.label }}</a
        >
      </nav>
      <a class="button header-call" :href="site.phoneLink">Chiama ora ↗</a>
    </div>
  </header>
</template>
