<template>
  <div class="min-h-screen flex flex-col">
    <BaseHeader/>
    <main class="flex flex-col flex-1 p-4">
      <slot></slot>
    </main>
    <BaseFooter/>
  </div>
</template>
