<script setup lang="ts">
import type { RecommendationStatusFilter } from '~/types/recommendations';
import { RECOMMENDATIONS_STATUS } from '~/types/recommendations';

const selectedStatus=defineModel<RecommendationStatusFilter>({default:'all'});

defineProps<{
  count:Record<string,number>;
}>();
</script>

<template>
  <div class="flex gap-6 mb-4 text-xs font-mono uppercase tracking-widest border-b border-zinc-100 pb-2">
    <button 
      v-for="status in RECOMMENDATIONS_STATUS"
      :key="status"
      @click="selectedStatus=status"
      :class="[
        'transition-colors duration-200',
        modelValue === status ? 'text-black border-b border-black' : 'text-zinc-400 hover:text-zinc-600'
      ]"
    >
      {{ $t(`status.${status}`) }} <span class="ml-1 opacity-50">[{{ count[status] }}]</span>
    </button>
  </div>
</template>
