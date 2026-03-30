import { ProjectService } from '~/services/ProjectService';
import type { Project } from '~/types/content';
import type { ViewMode } from '~/types/recommendations';
import { isProjectElegible } from '~/utils/project';

export function useProjectsFilter(){
  const searchQuery=ref<string>('');
  const selectedTags=ref<string[]>([]);
  const selectedViewMode=ref<ViewMode>('grid');

  const projects=ref<Project[]>([]);

  const {locale}=useI18n();

  async function fetch(){
    const {data}=await useAsyncData(
      `projects-${locale.value}`,
      async()=>await ProjectService.getAll(locale.value),
      {watch:[locale]},
    );

    if(data.value===undefined)
      throw Error('Could not fetch projects');

    projects.value=data.value;
  }

  const filteredProjects=computed<Project[]>(()=>{
    if(projects.value===undefined)return[];

    const query=searchQuery.value.toLowerCase();

    return projects.value.filter(project=>
      isProjectElegible(project,query,selectedTags.value),
    );
  });

  const tagFrequencyMap=computed(()=>{
    const frequencyMap:Record<string,number>={};

    projects.value?.forEach(project=>{
      project.tags?.forEach((tag:string)=>{
        frequencyMap[tag]=(frequencyMap[tag]||0)+1;
      });
    });

    return frequencyMap;
  });

  const tags=computed(()=>Object.keys(tagFrequencyMap.value));

  function reset(){
    searchQuery.value='';
    selectedTags.value=[];
  }

  return{
    fetch,
    searchQuery,
    selectedTags,
    selectedViewMode,
    filteredProjects,
    tags,
    tagFrequencyMap,
    reset,
  };
}
