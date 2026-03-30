<script setup lang="ts">
import type { ViewMode } from '~/types/recommendations';

defineProps<{
  to:string;
  img:string;
  alt?:string;
  tags:string[];
  viewMode:ViewMode;
}>();
</script>

<template>
  <NuxtLinkLocale
    :to="to"
    class=""
    :class="[
      viewMode==='grid'
        ?'hover:scale-110 transition-transform duration-200'
        :'flex'
    ]"
  >
    <img
      class=" object-cover aspect-video rounded-sm"
      :class="[
        viewMode==='grid'
          ?'mb-4 w-full'
          :'w-64 mr-4'
      ]"
      :src="img"
      :alt="alt"
    />
    <div class="flex flex-col">
      <div class="flex flex-col flex-1">
        <h2 class="mb-2 font-bold text-xl">
          <slot name="title"></slot>
        </h2>
        <slot name="description"></slot>
      </div>
      <div class="flex flex-wrap gap-2 mt-2">
        <BaseBadge
          v-for="tag in tags"
          :key="tag"
        >
          {{ $te(`badges.${tag}`) ? $t(`badges.${tag}`) : tag }}
        </BaseBadge>
      </div>
    </div>
  </NuxtLinkLocale>
</template>
