<script setup lang="ts">
import { GraphAPI2D } from '@engines/2d/GraphAPI2D';

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

const camera=new CameraObject(4,[-3,3],[-3,3]);
const linearFunction=new LinearFunctionObject(7,3,1,5,[-3,3]);

async function begin(){
  if(!graphRef.value)return;
  if(!graphRef.value.api)return;

  graphRef.value.api.startAnimationLoop();
  graphRef.value.api.add(camera);
  graphRef.value.api.setActiveCamera(camera);
  graphRef.value.api.add(linearFunction);

  await graphRef.value.api.play(
    graphRef.value.api.animate.fadeIn(linearFunction),
  );
  // graphRef.value.api.add(thePoint);
  // graphRef.value.api.add(theVector);
  // graphRef.value.api.add(theFunction);
  // await graphRef.value.play(
  //   graphRef.value.animate.fadeIn(thePoint),
  //   graphRef.value.animate.fadeIn(theVector),
  //   graphRef.value.animate.fadeIn(theFunction),
  // );
  // graphRef.value.add(theVector); // this adds immediately on the scene
  // graphRef.value.add(thePoint); // this adds immediately on the scene
  // graphRef.value.add(theFunction); // this adds immediately on the scene
  // graphRef.value.remove(theVector); // this removes immediately on the scene

  // if i wanted I could add the vector with a specific animation
  // I could add two objects simultaneously (they may have different durations)
  // await graphRef.value.play(
  //   graphRef.value.animate.grow(theVector,{duration:1000}), // there are animations that only work with specific math objects
  //   graphRef.value.animate.fadeIn(theVector,{duration:500}),
  // );
  console.log('run after animation end');
}

async function remove(){
  if(!graphRef.value)return;

  // await graphRef.value.play(
  //   graphRef.value.animate().fadeOut(theVector),
  // );
  // graphRef.value.remove(theVector);
  // await graphRef.value.play(
  //   graphRef.value.animate.fadeOut(theFunction),
  // );
  // graphRef.value.remove(theFunction);
}

async function clear(){
  if(!graphRef.value)return;

  graphRef.value.api.clear();
}

async function update(){
  if(!graphRef.value)return;

  // what if the user alters the value of the slope of a linear function
  // I want the line to go to the point with an animation (maybe I could use lerp)
  // but sometimes I want the line to alter instanteneously (in the next tick)
  linearFunction.setParameters(-3,1);
  graphRef.value.api.requestUpdate();
}
</script>

<template>
  <ArticleSection title="Introduction" id="introduction">
    <ArticleMathGraphEngine preset="standard" ref="graphRef"/>
    <button @click="begin">Begin</button>
    <button @click="remove">Remove</button>
    <button @click="clear">Clear</button>
    <button @click="update">Update</button>
 </ArticleSection>
</template>
