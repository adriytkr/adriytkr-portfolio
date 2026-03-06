<script setup lang="ts">
import { GraphAPI2D } from '@engines/2d/core/GraphAPI2D';
import { CameraObject } from '@engines/2d/core/CameraObject';
import { SceneNode2D } from '@engines/2d/core/SceneNode2D';

import { PolynominalFunctionObject,CircleObject } from '@math-objects';
import { AxisRenderer,FunctionRenderer,CircleRenderer } from '@engines/2d/library/renderers/';
import { FadeInAnimation } from '~/engines/2d/library/animations';

const SLUG='linear-regression';
const sections:string[]=[
  'introduction',
  'problem',
  'criteria',
  'compute',
  'infinitely-many-solutions',
  'why-square',
  'linear-algebra',
];

definePageMeta({
  layout:'article',
  props:{
    slug:SLUG,
    sections,
  },
});

useArticleMeta(SLUG);

const graphRef=ref<{api:GraphAPI2D}|null>(null);
onMounted(()=>{
  if(!graphRef.value)return;
});

const camera=new CameraObject([-10,10],[-10,10]);

// Standard X Axis
const xAxis=new SceneNode2D(1,{
  origin:{x:0,y:0},
  vector:{x:1,y:0},
  unitLength:1,
  labelOffset:3,
  tickSize:10,
},{},new AxisRenderer());

// Standard Y Axis
const yAxis=new SceneNode2D(2,{
  origin:{x:0,y:0},
  vector:{x:0,y:1},
  unitLength:1,
  labelOffset:3,
  tickSize:10,
},{},new AxisRenderer());

const func=new SceneNode2D(
  3,
  new PolynominalFunctionObject([0,0,1,3],100),
  {opacity:1},
  new FunctionRenderer(),
);

const circle=new SceneNode2D(
  4,
  new CircleObject({x:1,y:1},1),
  {borderColor:'red',fillColor:'yellow'},
  new CircleRenderer(),
);

async function begin(){
  if(!graphRef.value)return;
  if(!graphRef.value.api)return;

  graphRef.value.api.startAnimationLoop();
  graphRef.value.api.add(camera);
  graphRef.value.api.setActiveCamera(camera);

  graphRef.value.api.add(xAxis);
  graphRef.value.api.add(yAxis);
  graphRef.value.api.add(func);
  graphRef.value.api.add(circle);
  graphRef.value.api.play(
    new FadeInAnimation(func),
  );
}

async function remove(){
  if(!graphRef.value)return;
  if(!graphRef.value.api)return;
}

async function clear(){
  if(!graphRef.value)return;
  if(!graphRef.value.api)return;

  graphRef.value.api.clear();
}

async function update(){
  if(!graphRef.value)return;
  if(!graphRef.value.api)return;
}
</script>

<template>
  <ArticleSection title="Introduction" id="introduction">
    <ArticleMathGraphEngine ref="graphRef"/>
    <button @click="begin">Begin</button>
    <button @click="remove">Remove</button>
    <button @click="clear">Clear</button>
    <button @click="update">Update</button>
 </ArticleSection>
</template>
