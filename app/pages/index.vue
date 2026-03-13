<script setup lang="ts">
import type { Entity } from '@adriytkr/engine';

import { Camera2D } from '@adriytkr/std/2d/index';

import {
  TransformSystem,
  create2DCamera,
  RendererSystem,
  FunctionGeometrySystem,
  AnimationSystem,
  FunctionSceneObject,
  Scene,
} from '@adriytkr/std';

import { PixiRendererAdapter } from '@adriytkr/pixi-renderer-2d';
import type { PixiDrawCommand } from '@adriytkr/pixi-renderer-2d';
import { CommandBuffer } from '@adriytkr/std';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

let camera:{
  entity:Entity,
  camera2D:Camera2D,
};
let scene:Scene;

let theFunction:FunctionSceneObject;
let theFunction2:FunctionSceneObject;

onMounted(async()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;
  canvas.width=canvas.clientWidth;
  canvas.height=canvas.clientHeight;

  scene=new Scene();

  scene.addSystem(new AnimationSystem());
  scene.addSystem(new TransformSystem());
  scene.addSystem(new FunctionGeometrySystem());

  const renderer=await PIXI.autoDetectRenderer({
    canvas:canvasRef.value,
    width:canvas.width,
    height:canvas.height,
    resolution:window.devicePixelRatio,
    antialias:true,
    autoDensity:true,
  });

  const pixiAdapter=new PixiRendererAdapter(renderer);
  const commandBuffer=new CommandBuffer<PixiDrawCommand>();
  scene.addSystem(new RendererSystem<PixiDrawCommand>(pixiAdapter,commandBuffer));

  camera=create2DCamera(
    scene.world,
    {
      position:{x:0,y:0,z:0},
      zoom:50,
      size:{
        width:canvas.width,
        height:canvas.height,
      },
    },
  );

  // const para=scene.world.createEntity();
  // scene.world.addComponent(para,new Transform());
  // scene.world.addComponent(para,new Hierarchy());
  // scene.world.addComponent(para,new ParametricFunctionObject({
  //   x:t=>t+5,
  //   y:t=>(t+5)**2,
  //   tDomain:[-3,3],
  //   samples:200,
  // }));
  // scene.world.addComponent(para,new Renderable());
  // scene.world.addComponent(para,new DirtyTag());

  theFunction=new FunctionSceneObject({
    fn:x=>x**2,
    domain:[-3,10],
    samples:200,
  });
  scene.add(theFunction);

  theFunction2=new FunctionSceneObject({
    fn:x=>2*x+3,
    domain:[-3,10],
    samples:200,
  });
  scene.add(theFunction2);

  // const polygon=world.createEntity();
  // world.addComponent(polygon,new Transform());
  // world.addComponent(polygon,new Hierarchy());
  // world.addComponent(polygon,new PolygonObject({
  //   vertices:[
  //     {x:0,y:0,z:0},
  //     {x:1,y:1,z:0},
  //     {x:2,y:1,z:0},
  //     {x:2,y:0,z:0},
  //   ]
  // }));
  // world.addComponent(polygon,new Renderable());
  // world.addComponent(polygon,new DirtyTag());

  // const pentagon=world.createEntity();
  // world.addComponent(pentagon,new Transform());
  // world.addComponent(pentagon,new Hierarchy());
  // world.addComponent(pentagon,new RegularPolygonObject({
  //   sidelength:2,
  //   sides:5,
  // }));
  // world.addComponent(pentagon,new Renderable());
  // world.addComponent(pentagon,new DirtyTag());

  // const vector=world.createEntity();
  // world.addComponent(vector,new Transform());
  // world.addComponent(vector,new Hierarchy());
  // world.addComponent(vector,new VectorObject({
  //   to:{x:4,y:2,z:0},
  // }));
  // world.addComponent(vector,new Renderable());
  // world.addComponent(vector,new DirtyTag());

  // const grid=world.createEntity();
  // world.addComponent(grid,new Transform());
  // world.addComponent(grid,new Hierarchy());
  // world.addComponent(grid,new GridObject({
  //   xMin:-3,
  //   xMax:3,
  //   yMin:-3,
  //   yMax:3,
  //   xStep:1,
  //   yStep:1,
  // }));
  // world.addComponent(grid,new Renderable());
  // world.addComponent(grid,new DirtyTag());

  // const arc=world.createEntity();
  // world.addComponent(arc,new Transform());
  // world.addComponent(arc,new Hierarchy());
  // world.addComponent(arc,new ArcObject({
  //   radius:3,
  //   startAngle:0,
  //   endAngle:Math.PI/3,
  // }));
  // world.addComponent(arc,new Renderable());
  // world.addComponent(arc,new DirtyTag());

  let lastTime=performance.now();
  function loop(time:number){
    pixiAdapter.root.removeChildren();

    const delta=(time-lastTime)/1000;
    lastTime=time;
    scene.update(delta);

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

function update(){
  theFunction.setDomain([-10,-5]);
  console.log(theFunction.domain);
}

function clear(){

}

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
  <button @click="update">Update</button>
</template>

<style scoped>
canvas{
  width:100%;
  height:500px;
  border:1px solid black;
  display:block;
}
</style>
