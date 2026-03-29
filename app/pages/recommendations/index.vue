<script setup lang="ts">
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

fetch();
</script>

<template>
  <h1 class="text-5xl mb-4">{{$t('recommendationsPage.title')}}</h1>
  <p class="mb-8">{{ $t('recommendationsPage.description') }}</p>
  <div class="flex flex-col md:flex-row md:justify-between md:items-center">
    <FilterSearch
      v-model="searchQuery"
      :placeholder="$t('recommendationsPage.search.placeholder')"
    />
    <FilterSelectViewMode v-model="selectedViewMode"/>
  </div>
  <FilterCategory
    :categories="categories"
    :frequency="categoryFrequencyMap"
    v-model="selectedCategories"
  />
  <FilterStatus
    v-model="selectedStatus"
    :count="statusCounts"
  />
  <p v-if="filteredRecommendations.length>0&&(searchQuery.trim().length>0||selectedCategories.length>0)" class="mb-4">
    {{ $t(
        'recommendationsPage.search.results',
        {
          count:filteredRecommendations.length,
          query:searchQuery,
        },
        filteredRecommendations.length,
      )
    }}
  </p>
  <div class="flex flex-1 flex-col items-center justify-center" v-if="filteredRecommendations.length===0">
    <p>{{ $t('recommendationsPage.search.emptyState') }}</p>
    <button @click="reset">
      {{$t('recommendationsPage.search.clearSearch')}}
    </button>
  </div>
  <RecommendationsList
    :recommendations="filteredRecommendations"
    :view-mode="selectedViewMode"
  />
</template>
