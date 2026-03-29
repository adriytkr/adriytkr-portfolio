<script setup lang="ts">
defineProps<{
  label:string;
  isSelected:boolean;
}>();
</script>

<template>
  <button
    class="px-4 py-2 cursor-pointer text-primary border border-primary rounded-full"
    :class="{'bg-primary text-white':isSelected}"
  >
    <slot></slot>
    <span class="ml-2 inline-block">{{ label }}</span>
  </button>
</template>
