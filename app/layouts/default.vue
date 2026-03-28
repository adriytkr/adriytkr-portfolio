<template>
  <div class="min-h-screen flex flex-col">
    <BaseHeader/>
    <main class="flex flex-col flex-1 p-4">
      <div class="w-full max-w-5xl mx-auto flex flex-1 flex-col">
        <slot></slot>
      </div>
    </main>
    <BaseFooter/>
  </div>
</template>
