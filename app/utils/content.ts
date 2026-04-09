import type { Collections } from '@nuxt/content';

import type {CustomLocale} from '~~/i18n/config/types';
import type { CustomCollection } from '~/types/content';

export const normalizeCollectionName=(type:CustomCollection,locale:CustomLocale):keyof Collections=>
  `${type}_${locale.replace('-','_')}` as keyof Collections;
