<script setup lang="ts">
import { derive,Node,watch } from '@adriytkr/core';

const canvasRef=ref<HTMLCanvasElement|null>(null);

const root=new Node();
const parent=new Node();
const child=new Node();
root.add(parent);
parent.add(child);

const et=new Node();

child.position.x.bind(
  derive([et.position.x],()=>et.position.x.value*2),
);

et.position.x.value=30;
console.log(child.position.x);

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
