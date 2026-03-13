<script setup lang="ts">
import { World,SystemManager } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

import {
  TransformSystem,
  Transform,
  Hierarchy,
  Renderable,
  FunctionGeometrySystem,
  FunctionObject,
  DirtyTag,
  AnimationGroup,
  shiftAnimationTrack,
  AnimationSystem,
  Camera3D,
  RendererSystem3D,
} from '@adriytkr/std';

import { OrbitControlSystem, ThreeRendererAdapter } from '@adriytkr/three-renderer-3d';
import type { ThreeDrawCommand } from '@adriytkr/three-renderer-3d';
import { CommandBuffer } from '@adriytkr/std';

import * as THREE from 'three';

const canvasRef=ref<HTMLCanvasElement|null>(null);

let world:World;
let systemManager:SystemManager;

let funcEntity:Entity;

onMounted(async()=>{
  if(!canvasRef.value)return;

  const canvas=canvasRef.value;
  canvas.width=canvas.clientWidth;
  canvas.height=canvas.clientHeight;

  world=new World();
  systemManager=new SystemManager();

  systemManager.add(new AnimationSystem());
  systemManager.add(new TransformSystem());
  systemManager.add(new FunctionGeometrySystem());

  const scene=new THREE.Scene();
  const threeCamera=new THREE.PerspectiveCamera(
    75,
    canvas.width/canvas.height,
    1,
    1000,
  );

  systemManager.add(new OrbitControlSystem(threeCamera,canvas));

  const renderer=new THREE.WebGLRenderer({
    canvas:canvasRef.value,
    antialias:true,
  });

  renderer.setSize(canvas.width,canvas.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const threeAdapter=new ThreeRendererAdapter(
    scene,
    threeCamera,
    renderer,
  );
  const commandBuffer=new CommandBuffer<ThreeDrawCommand>();
  systemManager.add(new RendererSystem3D<ThreeDrawCommand>(threeAdapter,commandBuffer));

  const cameraEntity = world.createEntity();
  world.addComponent(cameraEntity,new Transform());
  const camera3D=new Camera3D({ 
    fov:75, 
    aspect:canvas.width/canvas.height,
  });
  world.addComponent(cameraEntity,camera3D);
  threeCamera.position.z=20;

  funcEntity=world.createEntity();
  world.addComponent(funcEntity,new Transform());
  world.addComponent(funcEntity,new Hierarchy());
  world.addComponent(funcEntity,new FunctionObject({
    fn:x=>x**2,
    samples:200,
    domain:[-3,3],
  }));
  world.addComponent(funcEntity,new Renderable());
  world.addComponent(funcEntity,new DirtyTag());

  let lastTime=performance.now();
  function loop(time:number){
    const delta=(time-lastTime)/1000;
    lastTime=time;

    threeAdapter.clear();
    systemManager.update(world,delta);
    renderer.render(scene,threeCamera);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
});

function update(){
  const animationGroup=world.addComponent(funcEntity,new AnimationGroup());
  const transform=world.getComponent(funcEntity,Transform)!;

  animationGroup.addTrack(shiftAnimationTrack(3,transform,{x:2,y:2,z:0}));

  // const func=world.getComponent(funcEntity,FunctionObject)!;
  // func.fn=x=>x**3;
  // world.addComponent(funcEntity,new DirtyTag());
}

onUnmounted(()=>{
  if(!canvasRef.value)return;
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
