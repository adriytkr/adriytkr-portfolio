import { defineContentConfig, defineCollection,z } from '@nuxt/content'

import type {CustomLocale} from './app/types/i18n';

const projectSchema=z.object({
  title:z.string(),
  description:z.string(),
  thumbnail:z.string().optional(),
});

const createProjectCollection=(locale:CustomLocale)=>defineCollection({
  type:'page',
  source:`${locale}/**/*.md`,
  schema:projectSchema,
});

export default defineContentConfig({
  collections: {
    'projects_en':createProjectCollection('en'),
    'projects_pt_BR':createProjectCollection('pt-BR'),
    'projects_de_DE':createProjectCollection('de-DE'),
  }
})
