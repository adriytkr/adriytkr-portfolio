<script setup lang="ts">
import type { ISearchAPI } from '~/types/search';

const {
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
}=useRecommendationsFilter();

const searchRef=ref<ISearchAPI|null>(null);

async function clearSearch(){
  reset();
  await nextTick();
  searchRef.value?.focusInput();
}

fetch();
</script>

<template>
  <h1 class="text-5xl mb-4">{{$t('recommendationsPage.title')}}</h1>
  <p class="mb-8">{{ $t('recommendationsPage.description') }}</p>
  <div class="flex flex-col md:flex-row md:justify-between md:items-center">
    <FilterSearch
      ref="searchRef"
      v-model="searchQuery"
      :placeholder="$t('recommendationsPage.search.placeholder')"
    />
    <FilterSelectViewMode v-model="selectedViewMode"/>
  </div>
  <FilterBadge
    :badges="categories"
    :frequency="categoryFrequencyMap"
    v-model="selectedCategories"
  />
  <FilterStatus
    v-model="selectedStatus"
    :count="statusCounts"
  />
  <FilterFeedback
    v-if="
      filteredRecommendations.length>0&&
      (searchQuery.trim().length>0||
      selectedCategories.length>0)
    "
    :match-count="filteredRecommendations.length"
    :query="searchQuery"
  />
  <FilterEmptyState
    v-if="filteredRecommendations.length===0"
    :message="$t('recommendationsPage.search.emptyState')"
    :action-label="$t('recommendationsPage.search.clearSearch')"
    @reset="clearSearch"
  />
  <RecommendationsList
    :recommendations="filteredRecommendations"
    :view-mode="selectedViewMode"
  />
</template>
