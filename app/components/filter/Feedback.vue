<script setup lang="ts">
defineProps<{
  matchCount:number;
  query:string;
}>();
</script>

<template>
  <p class="mb-4">
    {{
      $t(
        'recommendationsPage.search.results',
        {
          count:matchCount,
          query,
        },
        matchCount,
      )
    }}
  </p>
</template>
