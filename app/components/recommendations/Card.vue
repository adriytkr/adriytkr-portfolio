<script setup lang="ts">
import type { RecommendationStatus, ViewMode } from '~/types/recommendations';

defineProps<{
  to:string;
  img:string;
  alt?:string;
  categories:string[];
  status:RecommendationStatus;
  viewMode:ViewMode;
}>();
</script>

<template>
  <NuxtLinkLocale
    :to="to"
    class="flex transition-transform duration-200"
    :class="[
      viewMode==='grid'?'flex-col hover:-translate-y-2 hover:scale-105':'flex-row'
    ]"
  >
    <div
      class="relative aspect-2/3"
      :class="[
        viewMode==='grid'?'w-full mb-4':'w-28 mr-2'
      ]"
    >
      <img
        class="w-full h-full object-cover"
        :src="img"
        :alt="alt"
      />
      <span
        class="absolute top-2 left-2 px-2 py-1 font-bold uppercase text-sm backdrop-blur-md"
        :class="status === 'reviewed'
          ? 'bg-green-500/30 text-green-500'
          : 'bg-zinc-800/70 text-zinc-300'"
      >
        {{ $t(`status.${status}`) }}
      </span>
    </div>
    <div class="flex flex-col flex-1">
      <div class="flex-1">
        <h2 class="mb-1 font-bold text-xl">
          <slot name="title"></slot>
        </h2>
        <h3 class="mb-2 text-gray-500">
          <slot name="author"></slot>
        </h3>
        <slot name="description"></slot>
      </div>
      <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="category in categories"
          :key="category"
          class="px-2 py-0.5 font-bold uppercase bg-zinc-100 border border-zinc-200 text-sm"
        >
          {{ $te(`categories.${category}`) ? $t(`categories.${category}`) : category }}
        </span>
      </div>
    </div>
  </NuxtLinkLocale>
</template>
