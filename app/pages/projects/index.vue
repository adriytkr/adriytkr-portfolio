<script setup lang="ts">
import type { ISearchAPI } from '~/types/filter';

const {t,locale}=useI18n();

const {
  fetch,
  searchQuery,
  selectedViewMode,
  selectedSortingMode,
  filteredProjects,
  matchesFound,
  reset,
}=useProjectsFilter(locale.value);

const searchRef=ref<ISearchAPI|null>(null);
const emptyStateMessage=computed<string>(
  ()=>t(
    'projectsPage.search.results',
    {
      query:searchQuery.value,
      count:matchesFound.value,
    },
    matchesFound.value,
  )
);

async function clearSearch(){
  reset();
  await nextTick();
  searchRef.value?.focusInput();
}

fetch();
</script>

<template>
  <h1 class="text-5xl mb-8">{{$t('projectsPage.title')}}</h1>
  <p class="mb-16 max-w-2xl">{{ $t('projectsPage.description') }}</p>
  <div class="mb-12">
    <div class="mb-6">
      <FilterSearch
        ref="searchRef"
        v-model="searchQuery"
        :placeholder="$t('projectsPage.search.placeholder')"
      />
    </div>
    <div class="flex justify-between items-center">
      <FilterSelectViewMode v-model="selectedViewMode"/>
      <FilterSort v-model="selectedSortingMode"/>
    </div>
  </div>
  <div class="flex flex-col flex-1">
    <div
      v-if="
        matchesFound>0&&
        searchQuery.trim().length>0
      "
      class="mb-4"
    >
      <FilterFeedback
        :match-count="matchesFound"
        :query="searchQuery"
      />
    </div>
    <FilterEmptyState
      v-if="matchesFound===0"
      :message="emptyStateMessage"
      :action-label="$t('projectsPage.search.clearSearch')"
      @reset="clearSearch"
    />
    <ProjectsList
      :projects="filteredProjects"
      :view-mode="selectedViewMode"
    />
  </div>
</template>
