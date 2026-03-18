<script setup lang="ts">
import * as PIXI from 'pixi.js';

import {
  Animator,
  Camera,
  ParametricCurve,
  FunctionCurve,
  ExplicitCurve,
  LinearFunction,
  Parabola,
} from '@adriytkr/math';

import { CurveView,Scene } from '@adriytkr/renderer-pixi';

const canvasRef=ref<HTMLCanvasElement|null>(null);

let scene:Scene;
const animator=new Animator();

const camera=new Camera({zoom:10});

onMounted(async()=>{
  if(canvasRef.value===null)return;

  canvasRef.value.width=canvasRef.value.clientWidth;
  canvasRef.value.height=canvasRef.value.clientHeight;

  const app=new PIXI.Application();

  await app.init({
    canvas:canvasRef.value,
    width:canvasRef.value.width,
    height:canvasRef.value.height,
    autoStart:false,
    resolution:window.devicePixelRatio||1,
    autoDensity:true,
  });

  scene=new Scene(app);
  scene.register(ParametricCurve,CurveView);





  const fn=new FunctionCurve(
    {
      x:t=>t,
      y:t=>t**2,
      z:t=>0,
      tDomain:[-3,3],
      resolution:100,
    },
    {
      stroke:'red',
      strokeWidth:0.1,
      opacity:1,
    },
  );

  const fn2=new ExplicitCurve(
    {
      y:x=>Math.sin(x),
      domain:[-Math.PI*2,Math.PI*2],
      resolution:500,
    },
    {
      stroke:'red',
      strokeWidth:0.1,
      opacity:1,
    },
  );

  const fn3=new LinearFunction(
    {
      slope:3,
      yIntercept:0,
      domain:[-3,3],
    },
    {
      stroke:'red',
      strokeWidth:0.1,
      opacity:1,
    },
  );

  const fn4=new Parabola(
    {
      a:3,
      b:0,
      c:0,
      domain:[-3,3],
      resolution:200,
    },
    {
      stroke:'red',
      strokeWidth:0.1,
      opacity:1,
    },
  );

  // scene.add(fn);
  // scene.add(fn2);
  // scene.add(fn3);
  scene.add(fn4);




  scene.stage.scale.set(camera.zoom$.value);
  updateStagePosition();

  camera.zoom$.subscribe(v=>{
    scene.stage.scale.set(v);
    updateStagePosition(); 
  });

  camera.position.x$.subscribe(updateStagePosition);
  camera.position.y$.subscribe(updateStagePosition);

  function updateStagePosition(){
    const zoom=camera.zoom$.value;
    scene.stage.x=(app.screen.width/2)-(camera.position.x$.value*zoom);
    scene.stage.y=(app.screen.height/2)-(camera.position.y$.value*zoom);
  }

  app.start();
  app.ticker.add((ticker)=>{
    const delta=ticker.elapsedMS;

    // square.position.x$.value+=10*delta;
    animator.update(delta);
    app.render();
  });

  canvasRef.value.addEventListener('wheel',handleZoom);
  canvasRef.value.addEventListener('mousedown',handleMouseDown);
  canvasRef.value.addEventListener('mouseup',handleMouseUp);
  canvasRef.value.addEventListener('mousemove',handleMouseMove);
});

onUnmounted(()=>{
  if(canvasRef.value===null)return;

  canvasRef.value.removeEventListener('wheel',handleZoom);
});

function animate():void{
}

function remove():void{}

let isDragging=false;
let lastX=0;
let lastY=0;

function handleMouseDown(event:MouseEvent):void{
  isDragging=true;
  lastX=event.clientX;
  lastY=event.clientY;
}

function handleMouseUp():void{
  isDragging=false;
}

function handleMouseMove(event:MouseEvent):void{
  if(!isDragging)return;

  const dx=event.clientX-lastX;
  const dy=event.clientY-lastY;

  lastX=event.clientX;
  lastY=event.clientY;

  camera.position.x$.value-=dx/camera.zoom$.value;
  camera.position.y$.value-=dy/camera.zoom$.value;
}

function handleZoom(event:WheelEvent):void{
  const delta=event.deltaY;

  if(delta<0)camera.zoom$.value*=1.1;
  else camera.zoom$.value/=1.1;
}
</script>

<template>
  <h1>Hello, World!</h1>
  <canvas ref="canvasRef"></canvas>
  <button @click="animate">Animate</button>
  <button @click="remove">Remove</button>
</template>

<style scoped>
canvas{
  width:100%;
  height:500px;
  border:1px solid black;
  display:block;
}
</style>
