<script setup lang="ts">
import { World } from '@adriytkr/engine';
import {
  Hierarchy,
  Transform,
  HierarchySystem,
  TransformSystem,
  Camera2D,
  Velocity,
  PhysicsSystem,
  AnimationSystem,
  AnimationGroup,
  Alpha,
} from '@adriytkr/std'
import { PixiRendererSystem,PixiRenderable } from '@adriytkr/renderer-pixi';

import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

const world=new World();

const physicsSystem=new PhysicsSystem(3);
const hierarchySystem=new HierarchySystem();
const transformSystem=new TransformSystem();
const animationSystem=new AnimationSystem();
let renderSystem:PixiRendererSystem;

const circle=world.createEntity();
world.addComponent(circle,new Hierarchy());
const circlePosition=world.addComponent(circle,new Transform());
circlePosition.localPosition={x:200,y:30,z:0};
world.addComponent(circle,new Velocity(30,0,0));
world.addComponent(circle,new Alpha(1));
const circleGraphics=new PIXI.Graphics()
  .circle(0,0,20)
  .fill(0xff0000);
world.addComponent(circle,new PixiRenderable(circleGraphics,c=>{
  const alpha=world.getComponent(circle,Alpha)!;
  circleGraphics.alpha=alpha.value;
}));

const square=world.createEntity();
world.addComponent(square,new Hierarchy(circle));
const squarePosition=world.addComponent(square,new Transform());
squarePosition.localPosition.y+=30;
const squareGraphics=new PIXI.Graphics()
  .rect(0,0,20,20)
  .fill('red');
// world.addComponent(square,new PixiRenderable(squareGraphics));

let lastTime=0;
let frameId:number|null=null;

function gameLoop(currentTime:number){
  const dt=(currentTime-lastTime)/1000;
  lastTime=currentTime;

  hierarchySystem.update(world,dt);
  physicsSystem.update(world,dt);
  transformSystem.update(world,dt);
  animationSystem.update(world,dt);
  renderSystem.update(world,dt);

  frameId=requestAnimationFrame(gameLoop);
}

onMounted(async()=>{
  if(!canvasRef.value)return;
  renderSystem=new PixiRendererSystem();
  await renderSystem.init(canvasRef.value);

  frameId=requestAnimationFrame(gameLoop);
});

onUnmounted(()=>{
  if(frameId)cancelAnimationFrame(frameId);
  renderSystem.dispose();
});

function fadeIn(){
  const alpha=world.getComponent(circle,Alpha)!;

  world.addComponent(circle,new AnimationGroup([
    {
      elapsed:0,
      duration:3,
      set(alp){
        alpha.value=alp;
      }
    }
  ]));
}

function fadeOut(){
  const alpha=world.getComponent(circle,Alpha)!;

  world.addComponent(circle,new AnimationGroup([
    {
      elapsed:0,
      duration:3,
      set(alp){
        alpha.value=1-alp;
      }
    }
  ]));
}
</script>

<template>
  <h1>Hello, World!</h1>
  <canvas ref="canvasRef"></canvas>
  <button @click="fadeIn">Fade In</button>
  <button @click="fadeOut">Fade Out</button>
</template>

<style scoped>
canvas{
  width:500px;
  height:500px;
  border:1px solid black;
}
</style>
