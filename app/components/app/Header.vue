<script setup lang="ts">
import type {NavLink} from '~/types/navigation';

const navLinks:NavLink[]=[
  {
    label:'nav.about',
    to:'/',
  },
  {
    label:'nav.projects',
    to:'/projects',
  },
  {
    label:'nav.recommendations',
    to:'/recommendations',
  },
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
            class="relative transition-colors duration-200 text-muted hover:text-body before:content-[''] before:absolute before:-bottom-2 before:right-1/2 before:w-1 before:h-1 before:rounded-full before:opacity-0 before:bg-body before:transition-opacity before:duration-200 hover:before:opacity-100"
            exact-active-class="is-active !text-primary font-bold before:opacity-100 before:!bg-primary"
          >
            {{ $t(navLink.label)}}
          </NuxtLinkLocale>
        </li>
      </ul>
      <ul class="flex items-center gap-4">
        <AppSwitchLanguage/>
        <AppToggleThemeButton/>
      </ul>
    </nav>
  </header>
</template>
