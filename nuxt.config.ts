import tailwindcss from '@tailwindcss/vite';

import {i18nConfig} from './i18n/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css:['~/assets/styles/main.css'],
  vite:{
    plugins:[
      tailwindcss(),
    ],
  },
  modules:[
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],
  i18n:i18nConfig,
  colorMode:{
    fallback:'light',
    dataValue:'theme',
  },
})
