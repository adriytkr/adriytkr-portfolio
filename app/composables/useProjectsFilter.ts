import type { ProjectSchema } from '~/types/projects';
import type { ViewMode,SortingMode } from '~/types/filter';

import {
  matchProject,
  sortProjectsWithStrategy,
} from '~/utils/project';
import type { CustomLocale } from '~~/i18n/config/types';

export function useProjectsFilter(locale:CustomLocale){
  const searchQuery=ref<string>('');
  const selectedViewMode=ref<ViewMode>('grid');

  const projects=ref<ProjectSchema[]>([]);

  async function fetch(){
    const result=await queryCollection('projects')
      .where('path','LIKE',`/docs/projects/${locale}/%`)
      .all() as ProjectSchema[];

    projects.value=result;
  }

  const selectedSortingMode=ref<SortingMode>('sorted');

  const filteredProjects=computed<ProjectSchema[]>(()=>{
    const result=projects.value.filter(project=>{
      return matchProject(
        project,
        searchQuery.value,
      );
    });

    return sortProjectsWithStrategy(
      selectedSortingMode.value,
      result,
    );
  });

  const matchesFound=computed<number>(()=>filteredProjects.value.length);

  function reset(){
    searchQuery.value='';
  }

  return{
    fetch,
    searchQuery,
    selectedViewMode,
    selectedSortingMode,
    filteredProjects,
    matchesFound,
    reset,
  };
}
