<script setup lang="ts">
import type { Collections } from '@nuxt/content';

import { PLACEHOLDER_IMAGE_PATH } from '~/constants/projects';
import { normalizeCollectionName } from '~/utils/content';

const {locale}=useI18n();

const {data:projects}=await useAsyncData(
  `projects-${locale.value}`,
  async()=>{
    const normalizedCollectionName=normalizeCollectionName('projects',locale.value) as keyof Collections;
    const projects=await queryCollection(normalizedCollectionName).all();

    return projects;
  },
  {
    watch:[locale],
  },
);
</script>

<template>
  <h1 class="text-5xl mb-4">{{$t('projectsPage.title')}}</h1>
  <p class="mb-8">{{ $t('projectsPage.description') }}</p>
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
