<script setup lang="ts">
const searchQuery=defineModel<string>({default:''});
</script>

<template>
  <form>
    <input
      type="text"
      v-model="searchQuery"
      class="px-4 py-2 w-full max-w-md border border-gray-400 rounded-sm"
      :placeholder="$t('recommendationsPage.search')"
    />
  </form>
</template>
