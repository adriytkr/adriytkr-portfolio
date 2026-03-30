<script setup lang="ts">
import type { ISearchAPI } from '~/types/search';

const searchQuery=defineModel<string>({default:''});

defineProps<{
  placeholder:string;
}>();

const inputRef=ref<HTMLInputElement|null>(null);

function focusInput(){
  inputRef.value?.focus();
}

defineExpose<ISearchAPI>({focusInput});
</script>

<template>
  <form class="flex-1  md:max-w-md md:w-full flex items-center">
    <input
      type="text"
      v-model="searchQuery"
      class="px-4 py-2 w-full border border-gray-400 rounded-sm"
      :placeholder="placeholder"
      ref="inputRef"
    />
  </form>
</template>
