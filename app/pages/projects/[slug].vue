<script setup lang="ts">
import { ProjectService } from '~/services/ProjectService';
import { normalizeSlug } from '~/utils/navigation';

const route=useRoute();
const {t,locale}=useI18n();

const {data:project,status}=await useAsyncData(
  `project-${locale.value}`,
  async()=>await ProjectService.getBySlug(locale.value,normalizeSlug(route.params.slug)),
  {watch:[locale]},
);

if(status.value!=='pending'&&project.value===null)
  throw showError({
    status:404,
    statusText:t('pageNotFound.title'),
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
