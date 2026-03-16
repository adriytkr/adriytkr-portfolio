<script setup lang="ts">
import { Node } from '@adriytkr/core';

const canvasRef=ref<HTMLCanvasElement|null>(null);

const root=new Node();
const parent=new Node();
const child=new Node();
root.add(parent);
parent.add(child);

child.translate(1,1,0);
child.position.x.value+=1;
child.position.y.value+=1;

console.log(parent.worldPosition,child.worldPosition);

// parent.position.x.value=100;
// console.log(parent.worldPosition,child.worldPosition);

// parent.remove(child);
// parent.position.x.value+=300;
// console.log(parent.worldPosition,child.worldPosition);

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
