<script setup lang="ts">
import type { ISearchAPI } from '~/types/filter';

defineProps<{
  placeholder:string;
}>();

const searchQuery=defineModel<string>({default:''});
const inputRef=ref<HTMLInputElement|null>(null);

function focusInput(){
  inputRef.value?.focus();
}

function clearInput(){
  searchQuery.value='';
  focusInput();
}

defineExpose<ISearchAPI>({
  focusInput,
});
</script>

<template>
  <form class="group relative flex items-center flex-1 md:max-w-md md:w-full">
    <input
      type="text"
      v-model="searchQuery"
      class="peer pl-10 pr-10 py-2 w-full border rounded-sm border-surface-border/25 transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 group-hover:border-surface-border group-hover:shadow-sm"
      :placeholder="placeholder"
      ref="inputRef"
    />
    <button
      @click="focusInput"
      class="absolute left-2 transition-colors duration-200 text-surface-border/25 cursor-text group-hover:text-primary peer-focus:text-primary"
      type="button"
      tabindex="-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
      </svg>
    </button>
    <button
      v-if="searchQuery.length>0"
      @click="clearInput"
      class="absolute right-2"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    </button>
  </form>
</template>
