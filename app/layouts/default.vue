<template>
  <div class="min-h-screen flex flex-col">
    <BaseHeader/>
    <main class="flex-1 p-4">
      <slot></slot>
    </main>
    <BaseFooter/>
  </div>
</template>
