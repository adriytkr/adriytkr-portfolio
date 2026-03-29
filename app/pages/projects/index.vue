<script setup lang="ts">
import { ProjectService } from '~/services/ProjectService';

const {locale}=useI18n();

const {data:projects}=await useAsyncData(
  `projects-${locale.value}`,
  async()=>await ProjectService.getAll(locale.value),
  {
    watch:[locale],
  },
);
</script>

<template>
  <h1 class="text-5xl mb-4">{{$t('projectsPage.title')}}</h1>
  <p class="mb-8">{{ $t('projectsPage.description') }}</p>
  <ProjectsList
    :projects="projects??[]"
  />
</template>
