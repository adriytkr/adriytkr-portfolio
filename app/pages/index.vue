<script setup lang="ts">
import * as PIXI from 'pixi.js';

import {
  Animator,
  Camera,
  Vector,
} from '@adriytkr/math';

import { PointView,Scene, VectorView } from '@adriytkr/renderer-pixi';

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

  scene=new Scene(app,camera);
  scene.register(Vector,VectorView);

  const vector=new Vector(
    {
      to:{x:1,y:1,z:0},
    },
    {
      lineFill:'red',
      lineStroke:'red',
      lineStrokeWidth:1,

      arrowFill:'red',
      arrowStroke:'red',
      arrowStrokeWidth:1,

      opacity:1,
    },
  );
  vector.position.x$.value=0;
  vector.position.y$.value=0;

  scene.add(vector);








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
