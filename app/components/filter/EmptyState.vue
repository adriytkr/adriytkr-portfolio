<script setup lang="ts">
defineProps<{
  message:string;
  actionLabel:string;
}>();

defineEmits<{
  (e:'reset'):void;
}>();
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <p class="mb-2">{{message}}</p>
    <button
      class="text-primary hover:underline cursor-pointer"
      @click="$emit('reset')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
