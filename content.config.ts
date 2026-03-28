import { defineContentConfig, defineCollection,z } from '@nuxt/content'

const projectSchema=z.object({
  title:z.string(),
  description:z.string(),
});

export default defineContentConfig({
  collections: {
    'projects_en': defineCollection({
      type: 'page',
      source: 'en/**/*.md',
      schema:projectSchema,
    }),
    'projects_pt_BR': defineCollection({
      type: 'page',
      source: 'pt-BR/**/*.md',
      schema:projectSchema,
    }),
    'projects_de_DE': defineCollection({
      type: 'page',
      source: 'de-DE/**/*.md',
      schema:projectSchema,
    }),
  }
})
