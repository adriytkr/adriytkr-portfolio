<script setup lang="ts">
import type { Recommendation } from '~/types/content';
import { PLACEHOLDER_IMAGE_PATH } from '~/constants/projects';
import type { ViewMode } from '~/types/recommendations';

defineProps<{
  viewMode:ViewMode;
  recommendations:Recommendation[];
}>();
</script>

<template>
  <div
    :class="[
      viewMode==='grid'
        ?'grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4'
        :'flex flex-col gap-6'
    ]"
  >
    <RecommendationsCard
      v-for="recommendation in recommendations"
      :key="recommendation.id"
      :img="recommendation.thumbnail??PLACEHOLDER_IMAGE_PATH"
      :to="`/recommendations/${recommendation.stem.split('/').pop()}`"
      :categories="recommendation.categories??[]"
      :status="recommendation.status??'pending'"
      :view-mode="viewMode"
    >
      <template #title>{{recommendation.title}}</template>
      <template #author>{{recommendation.author}}</template>
      <template #description>
        <p :class="[viewMode==='grid'?'block':'hidden']">{{recommendation.description}}</p>
        <p :class="[viewMode==='list'?'block':'hidden']">{{ recommendation.longDescription }}</p>
      </template>
    </RecommendationsCard>
  </div>
</template>
