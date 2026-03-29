import type { Collections } from '@nuxt/content';

import type { CustomLocale } from '~/types/i18n';
import type { Recommendation } from '~/types/content';
import { normalizeCollectionName } from '~/utils/content';

export class RecommentationService{
  static async getAll(locale:CustomLocale):Promise<Recommendation[]>{
    const normalizedCollectionName=normalizeCollectionName('recommendations',locale);
    const recommendations:Recommendation[]=await queryCollection(normalizedCollectionName).all();

    return recommendations;
  }

  static async getBySlug(locale:CustomLocale,slug:string):Promise<Recommendation|null>{
    const normalizedCollectionName=normalizeCollectionName('recommendations',locale) as keyof Collections;
    const recommendationPath=`/${locale}/recommendations/${slug}`;

    const content=await queryCollection(normalizedCollectionName)
      .path(recommendationPath.toLowerCase())
      .first();

    return content;
  }
}
