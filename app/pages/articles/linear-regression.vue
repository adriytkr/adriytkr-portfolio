<script setup lang="ts">
import { GraphAPI2D } from '@engines/2d/GraphAPI2D';
import { SceneNode } from '~/shared/types/math/engines/2d/SceneNode';

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

const camera=new CameraObject([-3,3],[-3,3]);

const node=new SceneNode(
  1,
  new LinearFunctionObject(3,1,5,[-3,3]),
  {opacity:1},
  new FunctionRenderer(),
);

const node2=new SceneNode(
  1,
  new QuadraticFunctionObject(2,3,1,100),
  {opacity:1},
  new FunctionRenderer(),
);

async function begin(){
  if(!graphRef.value)return;
  if(!graphRef.value.api)return;

  graphRef.value.api.add(camera);
  graphRef.value.api.setActiveCamera(camera);
  graphRef.value.api.startAnimationLoop();

  graphRef.value.api.add(node);
  graphRef.value.api.add(node2);

  await graphRef.value.api.play(
    new FadeInAnimation(node),
    new FadeInAnimation(node2),
  );
}

async function remove(){
  if(!graphRef.value)return;
  if(!graphRef.value.api)return;

  graphRef.value.api.remove(node);
  graphRef.value.api.requestUpdate();
}

async function clear(){
  if(!graphRef.value)return;

  graphRef.value.api.clear();
}

async function update(){
  if(!graphRef.value)return;
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
