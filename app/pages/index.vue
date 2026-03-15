<script setup lang="ts">
import {
  Signal,
  Derive,
} from '@adriytkr/core';



const canvasRef=ref<HTMLCanvasElement|null>(null);

onMounted(()=>{
  if(canvasRef.value===null)return;
});
</script>

<template>
  <h1>Hello, World!</h1>
  <canvas ref="canvasRef"></canvas>
</template>

<style scoped>
canvas{
  width:100%;
  height:500px;
  border:1px solid black;
  display:block;
}
</style>
