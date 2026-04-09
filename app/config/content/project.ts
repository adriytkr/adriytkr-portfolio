import { defineCollection,z } from '@nuxt/content';

import type {CustomLocale} from '../../../i18n/config/types';

export const projectSchema=z.object({
  title:z.string(),
  description:z.string(),
  thumbnail:z.string().optional(),
  tags:z.array(z.string()),
});

export const createProjectCollection=(locale:CustomLocale)=>
  defineCollection({
    type:'page',
    source:`${locale}/projects/**/*.md`,
    schema:projectSchema,
  });
