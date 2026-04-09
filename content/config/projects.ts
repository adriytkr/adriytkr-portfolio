import {defineCollection,z} from '@nuxt/content';

export const projectSchema=z.object({
  slug:z.string(),
  title:z.string(),
  description:z.string(),
  thumbnail:z.string().optional(),
});

export const projectsCollection=defineCollection({
  type:'page',
  source:'docs/projects/**/*.md',
  schema:projectSchema,
});
