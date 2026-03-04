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
const thePoint=new PointObject(2,{x:1,y:-1},5);
const camera=new CameraObject(4,[-3,3],[-3,3]);
const camera2=new CameraObject(5,[-2,4],[-3,3]);
const theFunction=new GeneralFunctionObject(6,x=>x**2,100);
const linearFunction=new LinearFunctionObject(7,3,1,5,[-3,3]);

async function begin(){
  if(!graphRef.value)return;

  graphRef.value.startAnimationLoop();
  graphRef.value.add(camera);
  graphRef.value.setActiveCamera(camera);
  graphRef.value.add(theVector);
  graphRef.value.add(linearFunction)
  await graphRef.value.play(
    graphRef.value.animate.fadeIn(linearFunction),
  );
  // graphRef.value.add(thePoint);
  // graphRef.value.add(theVector);
  // graphRef.value.add(theFunction);
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

  console.log(graphRef.value);
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

  graphRef.value.clear();
}

async function update(){
  if(!graphRef.value)return;

  // graphRef.value.setActiveCamera(camera2);
  await graphRef.value.play(
    graphRef.value.animate.moveCamera(camera,[-6,6],[-6,6]),
  )

  // await graphRef.value.play(
  //   graphRef.value.animate.shift(thePoint,{x:1,y:1}),
  //   graphRef.value.animate.shift(theVector,{x:-1,y:0}),
  // );
  // what if the user alters the value of the slope of a linear function
  // I want the line to go to the point with an animation (maybe I could use lerp)
  // but sometimes I want the line to alter instanteneously (in the next tick)
  // theFunction.setParameters(3,2);
  // graphRef.value.updateScene();

  // // or if I wanted to change parameters smoothly (interpolation)
  // await graphRef.value.play(
  //   graphRef.value.customAnimation(
  //     (alpha:number)=>{ // alpha is a value between 0 and 1 based on the duration
  //       theFunction.setParameters(lerp(3,6,t),2); // change slope from 3 to 6 smoothly. y-intercept doesn't change
  //       // maybe we should call graphRef.value.updateScene()???? idk
  //     },
  //     {duration:2000},
  //   ),
  // );

  // // the customAnimation above could be written as
  // await graphRef.value.play(
  //   graphRef.value.interpolate(
  //     3, // initial slope
  //     6, // final slope
  //     (value:number)=>{
  //       theFunction.setParameters(value,2); // change slope from 3 to 6 smoothly. y-intercept doesn't change
  //       // maybe we should call graphRef.value.updateScene()???? idk
  //     },
  //     {duration:3000},
  //   ),
  // );

  // should I call play everytime I want to play some animation???
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
