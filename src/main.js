import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import { getPage } from './data/pages'
import { aliases } from './data/site'
import './style.css'
const path = location.pathname.replace(/\/$/, '') || '/'
const page = getPage(aliases[path] || path)
const mount = document.querySelector('#app')
;(mount.querySelector('main') ? createSSRApp : createApp)(App, { page }).mount(mount)
