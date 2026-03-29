<script setup lang="ts">
import type { Recommendation } from '~/types/recommendations';
import { PLACEHOLDER_IMAGE_PATH } from '~/constants/projects';

defineProps<{
  recommendations:Recommendation[];
}>();
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
    <RecommendationsCard
      v-for="recommendation in recommendations"
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
