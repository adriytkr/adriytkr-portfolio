<script setup lang="ts">
import placeholderImage from '~/assets/images/placeholder.png';
</script>

<template>
  <h1 class="text-5xl mb-4">Projects</h1>
  <p class="mb-8">These are my projects. They cover a wide area of topics and technologies.</p>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <BaseCard :img="placeholderImage" :to="`/projects/bismarck`">
      <template #title>Bismarck</template>
      <template #description>
        <p>
          Bismarck is a project about...
        </p>
      </template>
    </BaseCard>
    <BaseCard :img="placeholderImage" :to="`/projects/ml`">
      <template #title>Machine Learning</template>
      <template #description>
        <p>
          Machine Learning is a project about...
        </p>
      </template>
    </BaseCard>
    <BaseCard :img="placeholderImage" :to="`/projects/programming-language`">
      <template #title>Programming Language</template>
      <template #description>
        <p>
          This is a programming language I'm building
        </p>
      </template>
    </BaseCard>
  </div>
</template>
