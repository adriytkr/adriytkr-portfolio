<script setup lang="ts">
import type { ISearchAPI } from '~/types/search';

const {
  fetch,
  searchQuery,
  selectedTags,
  selectedViewMode,
  filteredProjects,
  tags,
  tagFrequencyMap,
  reset,
}=useProjectsFilter();

const searchRef=ref<ISearchAPI|null>(null);

async function clearSearch(){
  reset();
  await nextTick();
  searchRef.value?.focusInput();
}

fetch();
</script>

<template>
  <h1 class="text-5xl mb-4">{{$t('projectsPage.title')}}</h1>
  <p class="mb-8">{{ $t('projectsPage.description') }}</p>
  <div class="flex flex-col md:flex-row md:justify-between md:items-center">
    <FilterSearch
      ref="searchRef"
      v-model="searchQuery"
      :placeholder="$t('projectsPage.search.placeholder')"
    />
    <FilterSelectViewMode v-model="selectedViewMode"/>
  </div>
  <FilterBadge
    :badges="tags"
    :frequency="tagFrequencyMap"
    v-model="selectedTags"
  />
  <FilterFeedback
    v-if="
      filteredProjects.length>0&&
      (searchQuery.trim().length>0||
      selectedTags.length>0)
    "
    :match-count="filteredProjects.length"
    :query="searchQuery"
  />
  <FilterEmptyState
    v-if="filteredProjects.length===0"
    :message="$t('projectsPage.search.emptyState')"
    :action-label="$t('projectsPage.search.clearSearch')"
    @reset="clearSearch"
  />
  <ProjectsList
    :projects="filteredProjects??[]"
    :view-mode="selectedViewMode"
  />
</template>
