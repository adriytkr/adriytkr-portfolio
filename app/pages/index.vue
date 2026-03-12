<script setup lang="ts">
import { World,SystemManager } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

import { Camera2D } from '@adriytkr/std/2d/index';

import {
  AnimationGroup,
  AnimationSystem,
  Hierarchy,
  PolylineGeometry,
  Renderable,
  Transform,
  TransformSystem,
  create2DCamera,
  rotateAnimationTrack,
  shiftAnimationTrack,
  RendererSystem,
} from '@adriytkr/std';

import {
  createArc,
  createGrid,
  createStandardAxes,
  createVector,
  createSquare,
  createCircle,
  createParametricFunction,
} from '@adriytkr/math';

import type { WorldObject } from '@adriytkr/math';

import { PixiRendererAdapter } from '@adriytkr/pixi-renderer-2d';

import * as PIXI from 'pixi.js';
import { PixiRendererSystem } from '~~/packages/pixi-renderer-2d/src/PixiRendererSystem';

const canvasRef=ref<HTMLCanvasElement|null>(null);

let world:World;
let systemManager:SystemManager;
let camera:{
  entity:Entity,
  camera2D:Camera2D,
};

onMounted(async()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;
  canvas.width=canvas.clientWidth;
  canvas.height=canvas.clientHeight;

  world=new World();
  systemManager=new SystemManager();

  systemManager.add(new AnimationSystem());
  systemManager.add(new TransformSystem());

  const renderer=await PIXI.autoDetectRenderer({
    canvas:canvasRef.value,
    width:canvas.width,
    height:canvas.height,
    resolution: window.devicePixelRatio,
    antialias:true,
    autoDensity:true,
  });

  const pixiAdapter=new PixiRendererAdapter(renderer);
  systemManager.add(new RendererSystem(pixiAdapter));

  camera=create2DCamera(
    world,
    {
      position:{x:0,y:0,z:0},
      zoom:50,
      size:{
        width:canvas.width,
        height:canvas.height,
      },
    },
  );

  const crazyLine=world.createEntity();
  world.addComponent(crazyLine,new PolylineGeometry([
    {x:1,y:1,z:0},
    {x:1,y:0,z:0},
    {x:2,y:1,z:0},
  ]));
  world.addComponent(crazyLine,new Transform());
  world.addComponent(crazyLine,new Hierarchy());

  let lastTime=performance.now();
  function loop(time:number){
    pixiAdapter.root.removeChildren();

    const delta=(time-lastTime)/1000;
    lastTime=time;
    systemManager.update(world,delta);

    renderer.render({
      container:pixiAdapter.root,
    });
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  canvas.addEventListener('wheel',handleMouseScroll);
  canvas.addEventListener('mousedown',handleMouseDown);
  canvas.addEventListener('mouseup',handleMouseUp);
  canvas.addEventListener('mousemove',handleMouseMove);
});

let isDragging=false;
let lastMouse={x:0,y:0};

function handleMouseScroll(e:WheelEvent){
  e.preventDefault();
  const zoomFactor=1.1;
  if(e.deltaY<0)camera.camera2D.zoom*=zoomFactor;
  else camera.camera2D.zoom/=zoomFactor;
}

function handleMouseDown(e:MouseEvent){
  isDragging=true;
  lastMouse={x:e.clientX,y:e.clientY};
}

function handleMouseUp(){
  isDragging=false
}

function handleMouseMove(e:MouseEvent){
  if(!isDragging)return;
  const dx=(e.clientX-lastMouse.x)/camera.camera2D.zoom;
  const dy=(e.clientY-lastMouse.y)/camera.camera2D.zoom;
  camera.camera2D.x-=dx;
  camera.camera2D.y+=dy;
  lastMouse={x:e.clientX,y:e.clientY};
}

onUnmounted(()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;

  canvas.removeEventListener('wheel',handleMouseScroll);
  canvas.removeEventListener('mousedown',handleMouseDown);
  canvas.removeEventListener('mouseup',handleMouseUp);
  canvas.removeEventListener('mousemove',handleMouseMove);
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
