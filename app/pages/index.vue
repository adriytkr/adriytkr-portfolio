<script setup lang="ts">
import { World } from '@adriytkr/engine';

import { Camera2D } from '@adriytkr/std/2d/index';
import {
  Renderable,
  RendererSystem,
  SystemManager,
  Transform,
} from '@adriytkr/std';

import type { Point } from '@adriytkr/std';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

onMounted(async()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;
  canvas.width=canvas.clientWidth;
  canvas.height=canvas.clientHeight;

  const world=new World();
  const systemManager=new SystemManager();

  const renderer=await PIXI.autoDetectRenderer({
    canvas:canvasRef.value,
    width:canvas.width,
    height:canvas.height,
    resolution: window.devicePixelRatio,
    antialias:true,
    autoDensity:true,
  });
  systemManager.add(new RendererSystem(renderer));

  const camera=world.createEntity()
  world.addComponent(camera,new Camera2D(
    0,
    0,
    50,
    canvas.width,
    canvas.height,
  ));

  const polyline=world.createEntity();
  world.addComponent(polyline,new Transform());
  const polylineVisual=new Renderable();
  polylineVisual.addCommand({
    type:'polyline',
    points:[
      {x:0,y:0},
      {x:2,y:0},
      {x:2,y:3},
    ],
  });
  world.addComponent(polyline,polylineVisual);

  const square=world.createEntity();
  world.addComponent(square,new Transform());
  const squareVisual=new Renderable();
  squareVisual.addCommand({
    type:'polygon',
    vertices:[
      {x:0,y:0},
      {x:1,y:0},
      {x:1,y:1},
      {x:0,y:1},
    ],
  });
  world.addComponent(square,squareVisual);

  const vector=world.createEntity();
  world.addComponent(vector,new Transform());
  const vectorFrom:Point={x:0,y:0};
  const vectorTo:Point={x:3,y:2};
  const size=0.3;
  const vectorVisual=new Renderable();
  vectorVisual.addCommand({
    type:'polyline',
    points:[
      vectorFrom,
      vectorTo,
    ],
  });
  const dx=vectorTo.x-vectorFrom.x;
  const dy=vectorTo.y-vectorFrom.y;
  const length=Math.sqrt(dx**2+dy**2);
  const ux=dx/length;
  const uy=dy/length;
  const px=-uy*size;
  const py=ux*size;
  const base1={x:vectorTo.x-ux*size+px,y:vectorTo.y-uy*size+py};
  const base2={x:vectorTo.x-ux*size-px,y:vectorTo.y-uy*size-py};
  vectorVisual.addCommand({
    type: 'polygon',
    vertices: [vectorTo, base1, base2],
  });
  world.addComponent(vector,vectorVisual);

  let lastTime=performance.now();
  function loop(time:number){
    const delta=(time-lastTime)/1000;
    lastTime=time;
    systemManager.update(world,delta);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
});

onUnmounted(()=>{});
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
