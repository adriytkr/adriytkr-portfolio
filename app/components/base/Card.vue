<script setup lang="ts">
defineProps<{
  to:string;
  img:string;
  alt?:string;
}>();
</script>

<template>
  <NuxtLinkLocale :to="to">
    <img
      class="mb-4 w-full object-cover"
      :src="img"
      :alt="alt"
    />
    <h2 class="mb-2 font-bold text-xl">
      <slot name="title"></slot>
    </h2>
    <slot name="description"></slot>
  </NuxtLinkLocale>
</template>
