<script setup lang="ts">
import type { ViewMode } from '~/types/recommendations';

const selectedViewMode=defineModel<ViewMode>({default:'grid'});
</script>

<template>
  <div class="flex items-center gap-x-4 my-4">
    <FilterViewModeButton
      :label="$t('filter.grid')"
      :is-selected="selectedViewMode==='grid'"
      @click="selectedViewMode='grid'"
    >
      <!-- Grid Icon -->
      <svg class="inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M120-120v-720h720v720H120Zm640-80v-240H520v240h240Zm0-560H520v240h240v-240Zm-560 0v240h240v-240H200Zm0 560h240v-240H200v240Z"/>
      </svg>
    </FilterViewModeButton>
    <FilterViewModeButton
      :label="$t('filter.list')"
      :is-selected="selectedViewMode==='list'"
      @click="selectedViewMode='list'"
    >
      <!-- List Icon -->
      <svg class="inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/>
      </svg>
    </FilterViewModeButton>
  </div>
</template>
