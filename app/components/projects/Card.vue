<script setup lang="ts">
import type { ViewMode } from '~/types/filter';

defineProps<{
  to:string;
  thumbnail:string;
  alt?:string;
  tags:string[];
  viewMode:ViewMode;
}>();

defineEmits<{
  (e:'select-tag',tag:string):void;
}>();
</script>

<template>
  <NuxtLinkLocale
    :to="to"
    class="group rounded-sm overflow-hidden"
    :class="[
      viewMode==='grid'
        ?'gridMode border bg-surface border-surface-border/10 shadow-sm transition-all duration-200 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
        :'listMode flex bg-surface-border/10 hover:bg-surface-border/50'
    ]"
  >
    <div
      class="relative overflow-hidden group-[.gridMode]:aspect-video group-[.gridMode]:mb-4 group-[.gridMode]:w-full group-[.listMode]:min-w-40 group-[.listMode]:min-h-24"
    >
      <img
        class="w-full h-full object-cover transition-all duration-500 will-change-transform group-hover:blur-sm group-hover:scale-110"
        :src="thumbnail"
        :alt="alt"
      />
      <div aria-hidden="true" class="absolute z-50 inset-0 bg-black/30 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-[.gridMode]:flex group-hover:opacity-100">
        <div class="flex gap-x-2 px-5 py-2 text-white tracking-wide font-bold border drop-shadow-sm bg-white/20 border-white rounded-full transition-all duration-200 opacity-80 translate-y-6 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 hover:bg-white/40 active:scale-95">
          {{ $t('projectsPage.viewBtn') }}
          <!-- Arrow Right -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
          </svg>
        </div>
      </div>
      <div class="absolute z-40 inset-0 bg-black/30 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.listMode]:flex">
        <div class="text-white -translate-x-10 transition-all duration-200 opacity-80 group-hover:translate-x-0 group-hover:opacity-100">
          <!-- Arrow Right -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="p-2 flex flex-col group-[.listMode]:m-2">
      <div class="flex flex-col flex-1 mb-4">
        <h2 class="mb-2 font-bold text-xl transition-colors duration-200 group-hover:text-primary">
          <slot name="title"></slot>
        </h2>
        <slot name="description"></slot>
      </div>
      <div class="flex flex-wrap gap-x-2">
        <ProjectsCardTag
          v-for="tag in tags"
          :key="tag"
          @click.stop.prevent="$emit('select-tag',tag)"
        >
          {{ $t(`tags.${tag}`) }}
        </ProjectsCardTag>
      </div>
    </div>
  </NuxtLinkLocale>
</template>
