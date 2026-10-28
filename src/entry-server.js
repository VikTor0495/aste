import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
export { pages, getPage } from './data/pages'
export { site, aliases } from './data/site'
export const render = (page) => renderToString(createSSRApp(App, { page }))
