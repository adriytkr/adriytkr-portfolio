import type { Collections } from '@nuxt/content';

import type { CustomLocale } from '~/types/i18n';
import type { Project } from '~/types/content';
import { normalizeCollectionName } from '~/utils/content';

export class ProjectService{
  static async getAll(locale:CustomLocale):Promise<Project[]>{
    const normalizedCollectionName=normalizeCollectionName('projects',locale);
    const projects:Project[]=await queryCollection(normalizedCollectionName).all();

    return projects;
  }

  static async getBySlug(locale:CustomLocale,slug:string):Promise<Project|null>{
    const normalizedCollectionName=normalizeCollectionName('projects',locale) as keyof Collections;
    const projectPath=`/${locale}/projects/${slug}`;

    const content=await queryCollection(normalizedCollectionName)
      .path(projectPath.toLowerCase())
      .first();

    return content;
  }
}
