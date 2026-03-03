<script setup lang="ts">
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

const graphRef=ref<GraphAPI|null>(null);
onMounted(()=>{
  if(!graphRef.value)return;
});

const theVector=new VectorObject(1,{x:0,y:0},{x:2,y:2});
const thePoint=new PointObject(2,{x:1,y:1},3);

async function begin(){
  if(!graphRef.value)return;

  graphRef.value.add(theVector); // this adds immediately on the scene
  graphRef.value.add(thePoint); // this adds immediately on the scene
  // graphRef.value.remove(theVector); // this removes immediately on the scene

  // // if i wanted I could add the vector with a specific animation
  // // I could add two objects simultaneously (they may have different durations)
  // graphRef.value.play(
  //   graphRef.value.animate.grow(theVector), // there are animations that only work with specific math objects
  //   graphRef.value.animate.fadeIn(theVector),
  // );
}

async function remove(){
  if(!graphRef.value)return;

  graphRef.value.remove(theVector);
}

async function clear(){
  if(!graphRef.value)return;

  graphRef.value.clear();
}

async function update(){
  // what if the user alters the value of the slope of a linear function
  // I want the line to go to the point with an animation (maybe I could use lerp)
  // but sometimes I want the line to alter instanteneously (in the next tick)
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
