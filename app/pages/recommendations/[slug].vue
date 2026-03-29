<script setup lang="ts">
import { RecommentationService } from '~/services/RecommendationService';
import { normalizeSlug } from '~/utils/navigation';

const route=useRoute();
const {t,locale}=useI18n();

const {data:recommendation,status}=await useAsyncData(
  `project-${locale.value}`,
  async()=>await RecommentationService.getBySlug(locale.value,normalizeSlug(route.params.slug)),
  {watch:[locale]},
);

if(status.value!=='pending'&&recommendation.value===null)
  throw showError({
    status:404,
    statusText:t('pageNotFound.title'),
    fatal:true,
  });

useSeoMeta({
  title:recommendation.value?.title,
  description:recommendation.value?.description,
});
</script>

<template>
  <ContentRenderer v-if="recommendation" :value="recommendation"/>
</template>
