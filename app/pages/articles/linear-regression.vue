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

async function begin(){
  if(!graphRef.value)return;

  const theVector=new VectorObject(1,{x:0,y:0},{x:1,y:1});
  const thePoint=new PointObject(2,{x:2,y:2},3);
  graphRef.value.play(
    graphRef.value.animate.growVector(theVector),
    graphRef.value.animate.fadeIn(thePoint),
  );
}

function kill(){
  if(!graphRef.value)return;
}

function move(){
  if(!graphRef.value)return;
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
