import type { ProjectSchema } from '~/types/projects';
import type { SortingMode } from '~/types/filter';

export function matchProject(
  project:ProjectSchema,
  query:string,
):boolean{
  const normalizedQuery=query.toLowerCase();

  const matchesQuery=
    project.title
      ?.toLowerCase()
      .includes(normalizedQuery)||
    project.description
      ?.toLowerCase()
      .includes(normalizedQuery);

  return matchesQuery;
}

export function sortProjectsWithStrategy(
  mode:SortingMode,
  projects:ProjectSchema[],
):ProjectSchema[]{
  const projectsCopy=[...projects];

  switch(mode){
    case 'sorted':
      return projectsCopy;
    case 'unsorted':
      return projectsCopy
        .sort()
        .reverse();
  }
}
