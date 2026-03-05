<script setup lang="ts">
import { DEFAULT_LANGUAGE,LANGUAGES } from '@constants/languages';

const {locale,setLocale}=useI18n();

const selectedLanguage=computed<Language>(()=>
  LANGUAGES.find(language=>language.code===locale.value)||DEFAULT_LANGUAGE
);
</script>

<template>
  <div class="languageSelection">
    <button class="languageSelection-btn">
      <svg class="languageSelection-btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    </button>
    <LayoutLanguageSelectionMenu
      class="languageSelection-menu"
      :languages="LANGUAGES"
      :selected-language="selectedLanguage"
      @select-language="language=>setLocale(language.code)"
    />
  </div>
</template>

<style scoped>
.languageSelection{
  position:relative;
}

.languageSelection-btn{
  padding:8px;
  background-color:transparent;
  border:none;
  display:inline-block;
}
.languageSelection-btn-icon{
  stroke:rgb(var(--text-color));
}
.languageSelection-menu{
  opacity:0;
  transition:opacity 100ms;
  pointer-events:none;
}
.languageSelection:hover .languageSelection-menu{
  opacity:1;
  pointer-events:all;
}
</style>
