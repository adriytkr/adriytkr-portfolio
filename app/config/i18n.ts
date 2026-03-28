import type { NuxtI18nOptions, LocaleObject } from '@nuxtjs/i18n';

import type {CustomLocale} from '../types/i18n';
import {fetchLocaleFiles} from '../utils/i18n';

export const locales:LocaleObject<CustomLocale>[]=[
  {
    code: 'en',
    name: 'English',
    files: fetchLocaleFiles('en'),
  },
  {
    code: 'pt-BR',
    name: 'Português',
    files: fetchLocaleFiles('pt-BR'),
  },
  {
    code: 'de-DE',
    name: 'Deutsch',
    files: fetchLocaleFiles('de-DE'),
  },
];

export const i18nConfig = {
  defaultLocale: 'en',
  locales,
} satisfies NuxtI18nOptions<CustomLocale>;
