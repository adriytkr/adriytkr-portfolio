<script setup lang="ts">
import { World } from '@adriytkr/engine';

import { Camera2D } from '@adriytkr/std/2d/index';
import {
  SystemManager,
  Transform,
} from '@adriytkr/std';

import {
  MathFunction,
  ParametricCurve,
  LineStyle,
  PixiRendererSystem,
  FunctionRenderSystem,
  ParametricCurveRenderSystem,
  CircleStyle,
  CircleGeometry,
  Vector,
  VectorStyle,
} from '@adriytkr/math';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

onMounted(async()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;
  canvas.width=canvas.clientWidth;
  canvas.height=canvas.clientHeight;

  const world=new World();

  const camera=world.createEntity()
  world.addComponent(camera,new Camera2D(
    0,
    0,
    50,
    canvas.width,
    canvas.height,
  ));

  const parabola=world.createEntity();
  world.addComponent(parabola,new Transform());
  world.addComponent(parabola,new MathFunction(
    x=>x**2,
    [-5,5],
  ));
  world.addComponent(parabola,new LineStyle('yellow',1));

  const parametricCurve=world.createEntity();
  world.addComponent(parametricCurve,new Transform());
  world.addComponent(parametricCurve,new ParametricCurve(
    t=>1,
    t=>t,
    [-3,3],
  ));
  world.addComponent(parametricCurve,new LineStyle('red',1));

  const circle=world.createEntity();
  world.addComponent(circle,new Transform());
  world.addComponent(circle,new CircleGeometry(1));
  world.addComponent(circle,new CircleStyle('white','red',1));

  const point=world.createEntity();
  const t=world.addComponent(point,new Transform());
  t.localPosition.x=1;
  t.localPosition.y=1;
  world.addComponent(point,new CircleGeometry(0.1));
  world.addComponent(point,new CircleStyle('red','red',1));

  const vector=world.createEntity();
  world.addComponent(vector,new Transform());
  world.addComponent(vector,new Vector(1,1));
  world.addComponent(vector,new VectorStyle('white','white'));

  const renderer=await PIXI.autoDetectRenderer({
    canvas:canvasRef.value,
    width:canvas.width,
    height:canvas.height,
    resolution: window.devicePixelRatio,
    antialias:true,
    autoDensity:true,
  });

  const systemManager=new SystemManager();
  systemManager.add(new FunctionRenderSystem());
  systemManager.add(new ParametricCurveRenderSystem());
  systemManager.add(new PixiRendererSystem(renderer));

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
