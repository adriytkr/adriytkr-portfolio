import fs from 'node:fs';
import path from 'node:path';

import type {CustomLocale} from './types';

export function fetchLocaleFiles(locale:CustomLocale):string[]{
  const localeDir=path.resolve(process.cwd(),'i18n/locales',locale);

  try{
    return fs.readdirSync(localeDir)
      .filter(file=>file.endsWith('.json'))
      .map(file=>`${locale}/${file}`);
  }catch(error){
    console.warn(`[i18n] Could not find directory for locale: ${locale}`);
    return [];
  }
}
