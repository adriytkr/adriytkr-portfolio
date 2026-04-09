<script setup lang="ts">
import { PLACEHOLDER_IMAGE_PATH } from '~/constants/config';

import type { ProjectSchema } from '~/types/projects';
import type { ViewMode } from '~/types/filter';

defineProps<{
  projects:ProjectSchema[];
  viewMode:ViewMode;
}>();
</script>

<template>
  <div
    :class="[
      viewMode==='grid'
        ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        :'flex flex-col gap-y-2'
    ]"
  >
    <ProjectsCard
      v-for="project in projects"
      :thumbnail="project.thumbnail??PLACEHOLDER_IMAGE_PATH"
      :to="`/projects/${project.slug}`"
      :view-mode="viewMode"
    >
      <template #title>{{project.title}}</template>
      <template #description>
        <p
          class="text-muted"
          :class="{
            'line-clamp-2':viewMode==='grid',
            'line-clamp-5':viewMode==='list',
          }"
        >
          {{project.description}}
        </p>
      </template>
    </ProjectsCard>
  </div>
</template>
