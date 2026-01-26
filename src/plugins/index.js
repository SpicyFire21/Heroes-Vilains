/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import { createPinia } from 'pinia'
import router from '@/router/index.js'

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(createPinia())
  app.use(router)
}
