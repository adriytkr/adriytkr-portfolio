<template>
  <a
    v-bind="$attrs"
    target="_blank"
    class="hover:text-primary dark:hover:text-primary transition-colors duration-200"
  >
    <slot></slot>
  </a>
</template>
