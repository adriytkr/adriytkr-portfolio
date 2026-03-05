import { getLocaleFiles } from './shared/utils/locale';
import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/content',
  ],
  alias:{
    '@math':fileURLToPath(new URL('./app/shared/types/math',import.meta.url)),
    '@math-objects':fileURLToPath(new URL('./app/shared/types/math/math-objects',import.meta.url)),
    '@engines':fileURLToPath(new URL('./app/shared/types/math/engines',import.meta.url)),
    '@constants':fileURLToPath(new URL('./app/shared/constants',import.meta.url)),
  },
  imports:{
    dirs:[
      '~/shared/types/**/*',
      '~/shared/utils',
    ],
  },
  css:[
    '~/assets/styles/variables.css',
    '~/assets/styles/theme.css',
    '~/assets/styles/main.css',
  ],
  i18n:{
    defaultLocale:'en',
    locales:[
      {
        code:'en',
        name:'English',
        files:getLocaleFiles('en'),
      },
      {
        code:'pt',
        name:'Portuguese',
        files:getLocaleFiles('pt'),
      },
    ],
    vueI18n:'./i18n.config.ts',
  },
});