<script setup lang="ts">
import type {NavLink,LocaleItem} from '~/types/navigation';

const {t,locale,setLocale}=useI18n();

const navLinks:NavLink[]=[
  {label:'nav.about',to:'/'},
  {label:'nav.projects',to:'/projects'},
  {label:'nav.recommendations',to:'/recommendations'},
]

const localesItem:LocaleItem[]=[
  {code:'en',name:'English'},
  {code:'pt-BR',name:'Português'},
  {code:'de-DE',name:'Deutsch'},
];
</script>

<template>
  <header class="header p-4">
    <nav class="flex justify-between items-center">
      <ul class="flex gap-4">
        <li
          v-for="navLink in navLinks"
          :key="navLink.to"
        >
          <NuxtLinkLocale
            :to="navLink.to"
            exact-active-class="text-primary font-bold"
          >
            {{ t(navLink.label)}}
          </NuxtLinkLocale>
        </li>
      </ul>
      <div>
        <ul class="flex gap-4">
          <select @change="setLocale($event.target.value)">
            <option
              v-for="localeItem in localesItem"
              :key="localeItem.code"
              :value="localeItem.code"
              :class="{'text-primary font-bold':locale===localeItem.code}"
              :selected="locale===localeItem.code"
            >
              {{ localeItem.name }}
            </option>
          </select>
          <BaseToggleThemeButton/>
        </ul>
      </div>
    </nav>
  </header>
</template>
