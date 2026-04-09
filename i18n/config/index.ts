import type { NuxtI18nOptions, LocaleObject } from '@nuxtjs/i18n';

import type {CustomLocale} from './types';
import {fetchLocaleFiles} from './utils';

export const locales:LocaleObject<CustomLocale>[]=[
  {
    code:'en',
    name:'English',
    files:fetchLocaleFiles('en'),
  },
  {
    code:'pt-br',
    name:'Português',
    files:fetchLocaleFiles('pt-br'),
  },
  {
    code:'de-de',
    name:'Deutsch',
    files:fetchLocaleFiles('de-de'),
  },
];

export const i18nConfig={
  defaultLocale:'en',
  locales,
} satisfies NuxtI18nOptions<CustomLocale>;
