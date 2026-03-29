<script setup lang="ts">
import { RecommentationService } from '~/services/RecommendationService';
import type { Recommendation } from '~/types/content';
import type { ViewMode } from '~/types/recommendations';
import { isRecommendationElegible } from '~/utils/recommendations';

const {locale}=useI18n();

const {data:recommendations}=await useAsyncData(
  `recommendations-${locale.value}`,
  async()=>await RecommentationService.getAll(locale.value),
  {watch:[locale]},
);

const searchQuery=ref<string>('');
const selectedCategories=ref<string[]>([]);
const selectedViewMode=ref<ViewMode>('grid');

const filteredRecommendations=computed<Recommendation[]>(()=>{
  if(recommendations.value===undefined)return[];

  const query=searchQuery.value.toLowerCase();

  return recommendations.value.filter(recommendation=>
    isRecommendationElegible(recommendation,query,selectedCategories.value),
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
</script>

<template>
  <h1 class="text-5xl mb-4">{{$t('recommendationsPage.title')}}</h1>
  <p class="mb-8">{{ $t('recommendationsPage.description') }}</p>
  <RecommendationsFilter
    v-model:query="searchQuery"
    v-model:categories="selectedCategories"
    v-model:view-mode="selectedViewMode"
    :category-list="categories"
    :category-frequency-map="categoryFrequencyMap"
  />
  <RecommendationsList
    :recommendations="filteredRecommendations"
    :view-mode="selectedViewMode"
  />
</template>
