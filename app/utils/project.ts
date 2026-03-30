import type { Project } from '~/types/content';

export function isProjectElegible(
  recommendation:Project,
  query:string,
  tags:string[],
):boolean{
  const matchesQuery=
    recommendation.title?.toLowerCase().includes(query)|| 
    recommendation.description?.toLowerCase().includes(query)||
    recommendation.longDescription?.toLowerCase().includes(query);

  const matchesTag=
    tags.length===0||
    tags.some(
      selectedTag=>recommendation.tags?.includes(selectedTag)
    );

  return matchesQuery&&matchesTag;
}
