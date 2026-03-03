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

async function begin(){
  if(!graphRef.value)return;

  const thePoint=new PointObject(1,{x:1,y:1},8);
  const theVector=new VectorObject(2,{x:0,y:0},{x:2,y:2});
  const theVector2=new VectorObject(3,{x:0,y:0},{x:0,y:3});
  const theFunction=new FunctionObject(4,x=>x**2,[-3,3],100);
  const theFunction2=new FunctionObject(4,x=>Math.sin(x),[-3,3],100);
  const theLine=new LineObject(5,{x:0,y:0},{x:-1,y:-1});
  const theGrid=new GridObject(6,1,1);

  graphRef.value.add(theGrid);
  graphRef.value.add(theFunction);
  graphRef.value.add(theFunction2);
  console.log('begin');
  await graphRef.value.play(
    // graphRef.value.animate.fadeIn(theVector),
    graphRef.value.animate.fadeIn(thePoint),
    graphRef.value.animate.growVector(theVector),
    graphRef.value.animate.growVector(theVector2,{duration:3000}),
    graphRef.value.animate.growVector(theLine,{duration:3000}),
  );

  console.log('matrix transformation');
  const r=Math.sqrt(2)/2;
  const matrix:Matrix2x2=[
    [r,-r],
    [r,r],
  ];
  await graphRef.value.play(
    graphRef.value.animate.applyMatrix(thePoint,matrix),
    graphRef.value.animate.applyMatrix(theVector,matrix),
    graphRef.value.animate.applyMatrix(theVector2,matrix),
    graphRef.value.animate.applyMatrix(theGrid,matrix),
  );

  console.log('moving');
  await graphRef.value.play(
    graphRef.value.animate.moveTo(thePoint,{x:-1,y:-1}),
    graphRef.value.animate.moveTo(theVector,{x:2,y:0}),
    graphRef.value.animate.shift(theVector2,{x:1,y:0}),
  );

  console.log('stop');
  await graphRef.value.play(
    graphRef.value.animate.fadeOut(thePoint),
    graphRef.value.animate.ungrowVector(theVector),
    graphRef.value.animate.ungrowVector(theVector2),
  );
  console.log('the end');
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
