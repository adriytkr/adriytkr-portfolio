<script setup lang="ts">
const searchQuery=defineModel<string>({default:''});
</script>

<template>
  <form class="flex-1  md:max-w-md md:w-full flex items-center">
    <input
      type="text"
      v-model="searchQuery"
      class="px-4 py-2 w-full border border-gray-400 rounded-sm"
      :placeholder="$t('recommendationsPage.search')"
    />
  </form>
</template>
