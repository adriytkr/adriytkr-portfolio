<script setup lang="ts">
defineProps<{
  categories:string[];
  frequency:Record<string,number>;
}>();

const selectedCategories=defineModel<string[]>({default:[]});

function selectCategory(category:string){
  if(!selectedCategories.value.includes(category)){
    selectedCategories.value.push(category);
    return;
  }

  const index=selectedCategories.value.findIndex(selectedCategory=>selectedCategory===category);
  selectedCategories.value.splice(index,1);
}
</script>

<template>
  <div class="mb-12 flex flex-wrap gap-4">
    <button
      v-for="category in categories"
      :key="category"
      @click="selectCategory(category)"
      class="px-2 py-1 border rounded-sm font-bold uppercase text-sm cursor-pointer"
      :class="[
        selectedCategories.includes(category)
          ?'bg-primary border-primary text-white'
          :'bg-zinc-100 border-zinc-200'
      ]"
    >
      {{ $te(`categories.${category}`) ? $t(`categories.${category}`) : category }}
      ({{ frequency[category] }})
    </button>
  </div>
</template>
