<script setup lang="ts">
import type {NavLink} from '~/types/navigation';

const navLinks:NavLink[]=[
  {label:'nav.about',to:'/'},
  {label:'nav.projects',to:'/projects'},
  {label:'nav.recommendations',to:'/recommendations'},
]
</script>

<template>
  <header class="header p-4">
    <nav class="w-full max-w-5xl mx-auto flex justify-between items-center">
      <ul class="flex items-center gap-4">
        <li
          v-for="navLink in navLinks"
          :key="navLink.to"
        >
          <NuxtLinkLocale
            :to="navLink.to"
            class="underline"
            exact-active-class="text-primary font-bold"
          >
            {{ $t(navLink.label)}}
          </NuxtLinkLocale>
        </li>
      </ul>
      <div>
        <ul class="flex items-center gap-4">
          <BaseSwitchLanguage/>
          <BaseToggleThemeButton/>
        </ul>
      </div>
    </nav>
  </header>
</template>
