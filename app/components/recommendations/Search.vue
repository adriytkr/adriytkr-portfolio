<script setup lang="ts">
const searchQuery=defineModel<string>({default:''});
</script>

<template>
  <form class="max-w-md w-full">
    <input
      type="text"
      v-model="searchQuery"
      class="mb-4 px-4 py-2 w-full border border-gray-400 rounded-sm"
      :placeholder="$t('recommendationsPage.search')"
    />
  </form>
</template>
