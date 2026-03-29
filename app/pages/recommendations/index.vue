<script setup lang="ts">
import ViewModeButton from '~/components/recommendations/ViewModeButton.vue';
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
  <div class="flex justify-between item-center">
    <RecommendationsSearch v-model="searchQuery"/>
    <div class="flex items-center gap-x-4">
      <ViewModeButton
        label="Grid"
        :is-selected="selectedViewMode==='grid'"
        @click="selectedViewMode='grid'"
      >
        <!-- Grid Icon -->
        <svg class="inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
          <path d="M120-120v-720h720v720H120Zm640-80v-240H520v240h240Zm0-560H520v240h240v-240Zm-560 0v240h240v-240H200Zm0 560h240v-240H200v240Z"/>
        </svg>
      </ViewModeButton>
      <ViewModeButton
        label="List"
        :is-selected="selectedViewMode==='list'"
        @click="selectedViewMode='list'"
      >
        <!-- List Icon -->
        <svg class="inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
          <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/>
        </svg>
      </ViewModeButton>
      </div>
  </div>
  <RecommendationsFilterByCategory
    :categories="categories"
    :frequency="categoryFrequencyMap"
    v-model="selectedCategories"
  />
  <RecommendationsList
    :recommendations="filteredRecommendations"
  />
</template>
