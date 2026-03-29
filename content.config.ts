import { defineContentConfig } from '@nuxt/content'
import { defineCollection,z } from '@nuxt/content';

import type {CustomLocale,RecommendationStatus} from './app/types/recommendations';
import {normalizeCollectionName} from './app/utils/content';

export const projectSchema=z.object({
  title:z.string(),
  description:z.string(),
  thumbnail:z.string().optional(),
});

export const createProjectCollection=(locale:CustomLocale)=>defineCollection({
  type:'page',
  source:`${locale}/projects/**/*.md`,
  schema:projectSchema,
});

const status:RecommendationStatus=['reviewed','pending'];

export const recommendationSchema=z.object({
  title:z.string(),
  description:z.string(),
  thumbnail:z.string().optional(),
  author:z.string(),
  categories:z.array(z.string()).default([]),
  status:z.enum(status).default('pending'),
});

export const createRecommendationSchema=(locale:CustomLocale)=>defineCollection({
  type:'page',
  source:`${locale}/recommendations/**/*.md`,
  schema:recommendationSchema,
});

const makeCollection=(locale:CustomLocale)=>({
  [normalizeCollectionName('projects',locale)]:createProjectCollection(locale),
  [normalizeCollectionName('recommendations',locale)]:createRecommendationSchema(locale),
});

export default defineContentConfig({
  collections: {
    ...makeCollection('en'),
    ...makeCollection('pt-BR'),
    ...makeCollection('de-DE'),
  }
})
