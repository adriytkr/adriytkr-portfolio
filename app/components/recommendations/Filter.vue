<script setup lang="ts">
import type { ViewMode } from '~/types/recommendations';

const searchQuery=defineModel<string>('query',{default:''});
const selectedCategories=defineModel<string[]>('categories',{default:[]});
const selectedViewMode=defineModel<ViewMode>('view-mode',{default:'grid'});

defineProps<{
  categoryList:string[];
  categoryFrequencyMap:Record<string,number>;
}>();
</script>

<template>
  <div class="flex flex-col md:flex-row md:justify-between md:items-center">
    <RecommendationsSearch v-model="searchQuery"/>
    <RecommendationsSelectViewMode v-model="selectedViewMode"/>
  </div>
  <RecommendationsFilterByCategory
    :categories="categoryList"
    :frequency="categoryFrequencyMap"
    v-model="selectedCategories"
  />
</template>
