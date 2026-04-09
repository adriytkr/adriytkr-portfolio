import type { ProjectSchema } from '~/types/content';
import type { ViewMode,SortingMode } from '~/types/filter';

import {
  isProjectElegible,
  sortProjectsWithStrategy,
} from '~/utils/project';

export function useProjectsFilter(){
  const searchQuery=ref<string>('');
  const selectedViewMode=ref<ViewMode>('grid');

  const {t,locale}=useI18n();
  const projects=ref<ProjectSchema[]>([]);

  async function fetch(){
    const {data}=await useProjects(locale);

    if(data.value===undefined)
      throw Error('Could not fetch projects');

    projects.value=data.value;
  }

  const selectedSortingMode=ref<SortingMode>('sorted');

  const filteredProjects=computed<ProjectSchema[]>(()=>{
    const result=projects.value.filter(project=>{
      const translatedTags=project.tags.map(tag=>
        t(`tags.${tag}`).toLowerCase()
      );

      return isProjectElegible(
        project,
        searchQuery.value,
        translatedTags,
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
