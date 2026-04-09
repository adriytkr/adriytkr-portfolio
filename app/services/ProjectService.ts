import type { CustomLocale } from '~~/i18n/config/types';
import type { ProjectSchema } from '~/types/content';
import { normalizeCollectionName } from '~/utils/content';

export class ProjectService{
  static async getAllProjects(
    locale:CustomLocale,
  ):Promise<ProjectSchema[]>{
    const normalizedCollectionName=normalizeCollectionName('projects',locale);

    const projects:ProjectSchema[]=
      await queryCollection(normalizedCollectionName).all() as ProjectSchema[];

    return projects;
  }

  static async getProjectBySlug(
    locale:CustomLocale,
    slug:string,
  ):Promise<ProjectSchema|null>{
    const normalizedCollectionName=normalizeCollectionName('projects',locale);
    const projectPath=`/${locale}/projects/${slug}`;

    const project=await queryCollection(normalizedCollectionName)
      .path(projectPath.toLowerCase())
      .first();

    if(project===null)return null;

    return project as ProjectSchema;
  }
}
