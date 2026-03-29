<script setup lang="ts">
import type { Collections } from '@nuxt/content';

import { PLACEHOLDER_IMAGE_PATH } from '~/constants/projects';
import { normalizeCollectionName } from '~/utils/content';

const {locale}=useI18n();

type Recommendation=Collections['recommendations_en'];

const {data:recommendations}=await useAsyncData(
  `recommendations-${locale.value}`,
  async()=>{
    const normalizedCollectionName=normalizeCollectionName('recommendations',locale.value);
    const recommendations:Recommendation[]=await queryCollection(normalizedCollectionName).all();

    return recommendations;
  },
  {
    watch:[locale],
  },
);

const searchQuery=ref<string>('');
const selectedCategories=ref<string[]>([]);

const filteredRecommendations=computed<Recommendation[]>(()=>{
  if(recommendations.value===undefined)return[];

  const query=searchQuery.value.toLowerCase();

  return recommendations.value.filter(recommendation=>
    (
      recommendation.title?.toLowerCase().includes(query)|| 
      recommendation.author?.toLowerCase().includes(query)||
      recommendation.description?.toLowerCase().includes(query)
    )&&
    (
      selectedCategories.value.length===0||
      selectedCategories.value.some(
        selectedCategory=>recommendation.categories?.includes(selectedCategory)
      )
    )
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

function selectCategory(category:string){
  if(!selectedCategories.value.includes(category)){
    selectedCategories.value.push(category);
    return;
  }

  const index=selectedCategories.value.findIndex(selectedCategory=>selectedCategory===category);
  selectedCategories.value.splice(index,1);
}
</script>

<template>
  <h1 class="text-5xl mb-4">{{$t('recommendationsPage.title')}}</h1>
  <p class="mb-8">{{ $t('recommendationsPage.description') }}</p>
  <div class="mb-4">
    <RecommendationsSearch v-model="searchQuery"/>
  </div>
  <div class="mb-12 flex flex-wrap gap-4">
    <button
      v-for="category in categories"
      :key="category"
      @click="selectCategory(category)"
      class="px-2 py-1 border font-bold uppercase text-sm cursor-pointer"
      :class="[
        selectedCategories.includes(category)
          ?'bg-primary border-primary'
          :'bg-zinc-100 border-zinc-200'
      ]"
    >
      {{ $te(`categories.${category}`) ? $t(`categories.${category}`) : category }}
      ({{ categoryFrequencyMap[category] }})
    </button>
  </div>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
    <RecommendationsCard
      v-for="recommendation in filteredRecommendations"
      :key="recommendation.id"
      :img="recommendation.thumbnail??PLACEHOLDER_IMAGE_PATH"
      :to="`/recommendations/${recommendation.stem.split('/').pop()}`"
      :categories="recommendation.categories??[]"
      :status="recommendation.status??'pending'"
    >
      <template #title>{{recommendation.title}}</template>
      <template #author>{{recommendation.author}}</template>
      <template #description>
        <p>{{recommendation.description}}</p>
      </template>
    </RecommendationsCard>
  </div>
</template>
