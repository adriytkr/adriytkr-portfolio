<script setup lang="ts">
import { World } from '@adriytkr/engine';
import {
  Hierarchy,
  Transform,
  HierarchySystem,
  TransformSystem,
  AnimationSystem,
  AnimationGroup,
  Alpha,
  SystemManager,
  MathCanvas,
  MathPosition,
  Camera2D,
  MathPoint,
  PointRenderSystem,
  Renderable,
  PixiRendererSystem,
  ActiveCameraTag,
  MathVector,
  VectorRenderSystem,
  MathFunction,
  FunctionRenderSystem,
} from '@adriytkr/std';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);
const world=new World();
const systemManager=new SystemManager();

let lastTime=0;
let frameId:number|null=null;
let renderer:PIXI.Renderer|null=null;

function gameLoop(currentTime:number){
  const delta=(currentTime-lastTime)/1000;
  lastTime=currentTime;

  systemManager.update(world,delta);

  frameId=requestAnimationFrame(gameLoop);
}

onMounted(async()=>{
  if(!canvasRef.value)return;

  renderer=await PIXI.autoDetectRenderer({
    view:canvasRef.value,
    width:canvasRef.value.scrollWidth,
    height:canvasRef.value.scrollHeight,
    resolution:window.devicePixelRatio||1,
    autoDensity:true,
    backgroundColor:0xeeeeee,
  }) as PIXI.Renderer;

  systemManager.add(new HierarchySystem());
  systemManager.add(new TransformSystem());
  systemManager.add(new AnimationSystem());
  systemManager.add(new PointRenderSystem());
  systemManager.add(new VectorRenderSystem());
  systemManager.add(new FunctionRenderSystem());
  systemManager.add(new PixiRendererSystem(renderer));

  const canvas=world.createEntity();
  world.addComponent(canvas,new MathCanvas(30,{x:0,y:0}));

  const point=world.createEntity();
  world.addComponent(point,new Transform());
  world.addComponent(point,new Hierarchy());
  world.addComponent(point,new MathPosition(0,0,canvas));
  world.addComponent(point,new MathPoint(10));
  world.addComponent(point,new Renderable(new PIXI.Graphics()));

  const vector=world.createEntity();
  world.addComponent(vector,new Transform());
  world.addComponent(vector,new Hierarchy());
  world.addComponent(vector,new MathPosition(0,0,canvas));
  world.addComponent(vector,new MathVector(3,0));
  world.addComponent(vector,new Renderable(new PIXI.Graphics()));

  const parabola=world.createEntity();
  world.addComponent(parabola,new Transform());
  world.addComponent(parabola,new Hierarchy());
  world.addComponent(parabola,new MathFunction(
    x=>x,
    [-Infinity,Infinity],
    canvas,
  ));
  world.addComponent(parabola,new Renderable(new PIXI.Graphics()));

  const camera=world.createEntity();
  world.addComponent(camera,new Camera2D(
    0,
    0,
    canvasRef.value.scrollWidth,
    canvasRef.value.scrollHeight,
  ));
  world.addComponent(camera,new ActiveCameraTag());

  frameId=requestAnimationFrame(gameLoop);
});

onUnmounted(()=>{
  if(frameId)cancelAnimationFrame(frameId);
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
}
</style>
