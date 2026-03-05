<script setup lang="ts">
import type { Preset } from '~/shared/types/math/engines/2d/types';

const props=defineProps<{
  preset:Preset,
}>();

const {
  containerRef,
  api,
}=useGraphEngine(props.preset);

defineExpose({
  api,
});
</script>

<template>
  <svg class="d3" ref="containerRef"></svg>
</template>

<style scoped>
.d3{
  width:100%;
  max-width:750px;
  height:400px;
  border:1px solid black;
  display:block;
}
</style>
