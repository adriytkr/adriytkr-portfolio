<script setup lang="ts">
import ProjectCard from '~/components/base/ProjectCard.vue';
import { PLACEHOLDER_IMAGE_PATH } from '~/constants/projects';

const {t,locale}=useI18n();

const {data:projects}=await useAsyncData(
  ``,
  async()=>{
    const normalizedCollectionName=normalizeCollectionName(locale.value);
    const projects=await queryCollection(normalizedCollectionName).all();

    return projects;
  },
  {
    watch:[locale],
  },
);
</script>

<template>
  <h1 class="text-5xl mb-4">{{t('projectsPage.title')}}</h1>
  <p class="mb-8">{{ t('projectsPage.description') }}</p>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <ProjectCard
      v-for="project in projects"
      :img="project.thumbnail??PLACEHOLDER_IMAGE_PATH"
      :to="`/projects/${project.stem.split('/').pop()}`"
    >
      <template #title>{{project.title}}</template>
      <template #description>
        <p>{{project.description}}</p>
      </template>
    </ProjectCard>
  </div>
</template>
