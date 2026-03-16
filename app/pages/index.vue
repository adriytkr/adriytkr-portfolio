<script setup lang="ts">
import {
  Signal,
  Derive,
  Node,
  Vector2,
} from '@adriytkr/core';

const canvasRef=ref<HTMLCanvasElement|null>(null);

const formatLocal=(node:Node):string=>
  `(${node.localPosition.value.x.value},${node.localPosition.value.y.value})`;
const formatWorld=(node:Node):string=>
  `(${node.worldPosition.value.x.value},${node.worldPosition.value.y.value})`;

const parent=new Node();
const child=new Node();

console.log(formatLocal(parent),formatWorld(parent));
console.log(formatLocal(child),formatWorld(child));
console.log('---');

parent.add(child);
parent.localPosition.value.x.value+=100;
console.log(formatLocal(parent),formatWorld(parent));
console.log(formatLocal(child),formatWorld(child));
console.log('---');

child.localPosition.value.x.value+=10;
console.log(formatLocal(parent),formatWorld(parent));
console.log(formatLocal(child),formatWorld(child));
console.log('---');

parent.remove(child);
parent.localPosition.value.x.value+=200;
console.log(formatLocal(parent),formatWorld(parent));
console.log(formatLocal(child),formatWorld(child));
console.log('---');

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
