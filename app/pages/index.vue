<script setup lang="ts">
import { World } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

import { Camera2D } from '@adriytkr/std/2d/index';
import {
  AnimationGroup,
  AnimationSystem,
  create2DCamera,
  createFunc,
  createGrid,
  createCircle,
  createPolygon,
  createRectangle,
  createSquare,
  createStandardAxes,
  createVector,
  Hierarchy,
  Renderable,
  RendererSystem,
  SystemManager,
  Transform,
  TransformSystem,
  createPentagon,
} from '@adriytkr/std';
import { shiftAnimation } from '@adriytkr/std';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

let world:World;
let systemManager:SystemManager;
let camera:{
  entity:Entity,
  camera2D:Camera2D,
};

let square:{
  entity:Entity,
  transform:Transform,
  renderable:Renderable,
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

  systemManager.add(new RendererSystem(renderer));

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
    {},
  );

  square=createSquare(
    world,
    {
      position:{x:0,y:0,z:0},
      size:1,
    },
  );

  const rectangle=createRectangle(
    world,
    {
      position:{x:-3,y:-1,z:0},
      width:2,
      height:1,
    },
  );

  const pentagon=createPentagon(
    world,
    {
      position:{x:0,y:0,z:0},
      sideLength:3,
    },
  );

  const vector=createVector(
    world,
    {
      from:{x:0,y:0,z:0},
      to:{x:2,y:2,z:0},
    },
    {
      color:'blue',
    },
  );

  world.addComponent(vector.entity,new Hierarchy(square.entity));
  const x=world.addComponent(square.entity,new Hierarchy());
  x.children.add(vector.entity);

  const func=createFunc(
    world,
    {
      fn:x=>x**2,
      domain:[-3,3],
      samples:100,
    },
  );

  const axes=createStandardAxes(
    world,
    {},
  );

  const grid=createGrid(
    world,
    {},
  );

  let lastTime=performance.now();
  function loop(time:number){
    const delta=(time-lastTime)/1000;
    lastTime=time;
    systemManager.update(world,delta);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  canvas.addEventListener('wheel',handleMouseScroll);
  canvas.addEventListener('mousedown',handleMouseDown);
  canvas.addEventListener('mouseup',handleMouseUp);
  canvas.addEventListener('mousemove',handleMouseMove);
});

function animate(){
  const squareAnimationGroup=world.addComponent(square.entity,new AnimationGroup());

  squareAnimationGroup.addTrack(shiftAnimation(
    2,
    square.transform,
    {x:2,y:2,z:0},
  ));
}

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
  <button @click="animate">Animate</button>
</template>

<style scoped>
canvas{
  width:100%;
  height:500px;
  border:1px solid black;
  display:block;
}
</style>
