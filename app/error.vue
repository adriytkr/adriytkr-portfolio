<script setup lang="ts">
const {t}=useI18n();
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex flex-1 flex-col items-center justify-center">
      <h1 class="text-5xl mb-4">{{t('pageNotFound.title')}}</h1>
      <p class="mb-2">{{t('pageNotFound.description')}}</p>
      <NuxtLinkLocale class="text-primary underline" to="/">{{t('pageNotFound.goBack')}}</NuxtLinkLocale>
    </div>
  </NuxtLayout>
</template>
