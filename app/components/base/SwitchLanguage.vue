<script setup lang="ts">
const {locale,setLocale,locales}=useI18n();

const currentLocale=computed<string>(()=>
  locales.value.find(loc=>loc.code===locale.value)?.name??''
);
</script>

<template>
  <div ref="container" class="group relative inline-block">
    <button 
      class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z"/>
      </svg>
      <span>{{ currentLocale }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
      </svg>
    </button>
    <div class="absolute right-0 top-full pt-2 w-48 z-50 
                opacity-0 pointer-events-none translate-y-1
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                transition-all duration-200">
      <div class="flex flex-col overflow-hidden bg-bg border border-zinc-200 dark:border-zinc-500 rounded-sm shadow-xl">
        <button
          v-for="localeItem in locales"
          :key="localeItem.code"
          @click="setLocale(localeItem.code);"
          class="text-left px-4 py-2 text-sm hover:text-primary transition-colors cursor-pointer"
          :class="{ 'text-primary font-bold': locale === localeItem.code }"
        >
          {{ localeItem.name }}
        </button>
      </div>
    </div>
    <!-- <div class="absolute right-0 mt-2 w-40 z-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
    </div> -->
  </div>
</template>
