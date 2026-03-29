import { RecommentationService } from '~/services/RecommendationService';
import type { Recommendation } from '~/types/content';
import type { ViewMode,RecommendationStatusFilter } from '~/types/recommendations';
import { isRecommendationElegible } from '~/utils/recommendations';

export function useRecommendationsFilter(){
  const {locale}=useI18n();

  const recommendations=ref<Recommendation[]>([]);

  async function fetch(){
    const {data}=await useAsyncData(
      `recommendations-${locale.value}`,
      async()=>await RecommentationService.getAll(locale.value),
      {watch:[locale]},
    );

    if(data.value===undefined)
      throw Error('Could not fetch projects');

    recommendations.value=data.value;
  }

  const searchQuery=ref<string>('');
  const selectedCategories=ref<string[]>([]);
  const selectedViewMode=ref<ViewMode>('grid');
  const selectedStatus=ref<RecommendationStatusFilter>('all');

  const filteredRecommendations=computed<Recommendation[]>(()=>{
    if(recommendations.value===undefined)return[];

    const query=searchQuery.value.toLowerCase();

    return recommendations.value.filter(recommendation=>
      isRecommendationElegible(recommendation,query,selectedCategories.value,selectedStatus.value),
    );
  });

  const categoryFrequencyMap=computed(()=>{
    const frequencyMap:Record<string,number>={};

    recommendations.value?.forEach(recommendation=>{
      recommendation.categories?.forEach((cat:string)=>{
        frequencyMap[cat]=(frequencyMap[cat]||0)+1;
      });
    });

    return frequencyMap;
  });

  const categories=computed(()=>Object.keys(categoryFrequencyMap.value));

  const statusCounts=computed(()=>{
    const counts={
      all:recommendations.value?.length||0,
      reviewed:0,
      pending:0,
    };

    recommendations.value?.forEach(item=>{
      if(item.status==='reviewed') counts.reviewed++;
      if(item.status==='pending') counts.pending++;
    });

    return counts;
  });

  function reset(){
    searchQuery.value='';
    selectedCategories.value=[];
    selectedStatus.value='all';
  }

  return{
    fetch,
    searchQuery,
    selectedCategories,
    selectedViewMode,
    selectedStatus,
    filteredRecommendations,
    categories,
    categoryFrequencyMap,
    statusCounts,
    reset,
  };
}
