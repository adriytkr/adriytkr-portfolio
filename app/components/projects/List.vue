<script setup lang="ts">
import { PLACEHOLDER_IMAGE_PATH } from '~/constants/projects';
import type { Project } from '~/types/content';

defineProps<{
  projects:Project[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <ProjectsCard
      v-for="project in projects"
      :img="project.thumbnail??PLACEHOLDER_IMAGE_PATH"
      :to="`/projects/${project.stem.split('/').pop()}`"
    >
      <template #title>{{project.title}}</template>
      <template #description>
        <p>{{project.description}}</p>
      </template>
    </ProjectsCard>
  </div>
</template>
