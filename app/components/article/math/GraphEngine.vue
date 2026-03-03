<script setup lang="ts">
const {
  containerRef,
  add,
  remove,
  clear,
}=useGraphEngine();

const api:GraphAPI={
  add,
  remove,
  clear,
  animate:{},
};
defineExpose(api);
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
