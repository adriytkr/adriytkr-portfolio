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
  graphRef.value.addAxes();
});

const theVector=new VectorObject(1,{x:0,y:0},{x:1,y:1});
const thePoint=new PointObject(2,{x:2,y:2},3);
const theFunction=new FunctionObject(3,x=>x**2,[-3,3],100);
const theLine=new LineObject(4,{x:2,y:2},{x:2,y:-2});

async function begin(){
  if(!graphRef.value)return;

  await graphRef.value.play(
    graphRef.value.animate.growVector(theVector),
    graphRef.value.animate.fadeIn(thePoint),
    graphRef.value.animate.growVector(theLine),
    graphRef.value.animate.fadeIn(theFunction),
  );

  // await graphRef.value.play(
  //   graphRef.value.animate(
  //     [theLine],
  //     ()=>{
  //       theLine.to
  //     },
  //   ),
  // );
}

function kill(){
  if(!graphRef.value)return;

  graphRef.value.play(
    graphRef.value.animate.ungrowVector(theVector),
    graphRef.value.animate.fadeOut(thePoint),
    graphRef.value.animate.ungrowVector(theLine),
    graphRef.value.animate.fadeOut(theFunction),
  );
}

function move(){
  if(!graphRef.value)return;

  graphRef.value.play(
    graphRef.value.animate.moveTo(theVector,thePoint.at),
    graphRef.value.animate.shift(theLine,{x:1,y:1}),
    graphRef.value.animate.shift(thePoint,{x:0,y:-3}),
  );
}
</script>

<template>
  <ArticleSection title="Introduction" id="introduction">
    <ArticleMathGraph ref="graphRef"/>
    <button @click="begin">Begin</button>
    <button @click="kill">Kill</button>
    <button @click="move">Move</button>
 </ArticleSection>
</template>
