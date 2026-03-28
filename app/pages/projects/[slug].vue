<script setup lang="ts">
import type { Collections } from '@nuxt/content';

const route=useRoute();
const {t,locale}=useI18n();

const {data:project,status}=await useAsyncData(
  `project-`,
  async()=>{
    const normalizedCollectionName=`projects_${locale.value.replace('-','_')}` as keyof Collections;

    const slug=route.params.slug;
    const projectPath=`/${locale.value}/${slug}`;

    const content=await queryCollection(normalizedCollectionName)
      .path(projectPath.toLowerCase())
      .first();

    return content;
  },
  {
    watch:[locale],
  },
);

if(status.value!=='pending'&&project.value===null)
  throw showError({
    status:404,
    statusText:t('error.title'),
    fatal:true,
  });

useSeoMeta({
  title:project.value?.title,
  description:project.value?.description,
});
</script>

<template>
  <ContentRenderer v-if="project" :value="project"/>
</template>
