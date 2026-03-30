<script setup lang="ts">
defineProps<{
  badges:string[];
  frequency:Record<string,number>;
}>();

const selectedBadges=defineModel<string[]>({default:[]});

function selectBadge(badge:string){
  if(!selectedBadges.value.includes(badge)){
    selectedBadges.value.push(badge);
    return;
  }

  const index=selectedBadges.value.findIndex(selectedCategory=>selectedCategory===badge);
  selectedBadges.value.splice(index,1);
}
</script>

<template>
  <div class="mb-12 flex flex-wrap gap-4">
    <button
      v-for="badge in badges"
      :key="badge"
      @click="selectBadge(badge)"
      class="px-2 py-1 border rounded-sm font-bold uppercase text-sm cursor-pointer"
      :class="[
        selectedBadges.includes(badge)
          ?'bg-primary border-primary text-white'
          :'bg-zinc-100 border-zinc-200'
      ]"
    >
      {{ $te(`badges.${badge}`) ? $t(`badges.${badge}`) : badge }}
      ({{ frequency[badge] }})
    </button>
  </div>
</template>
