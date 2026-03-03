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
const theLine=new LineObject(4,{x:2,y:2},{x:2,y:-2});

const a=ref(0);
const b=ref(0);

const pointA=reactive<PointObject>(new PointObject(1,{x:1,y:1},3));
const pointB=new PointObject(2,{x:2,y:2},3);
const pointC=new PointObject(3,{x:3,y:3},3);

const theFunction=reactive(new FunctionObject(4,x=>a.value*x+b.value,[0,3],100));

const residuals = reactive([
  new LineObject(5, { x: 1, y: 1 }, { x: 1, y: 1 }),
  new LineObject(6, { x: 2, y: 2 }, { x: 2, y: 2 }),
  new LineObject(7, { x: 3, y: 3 }, { x: 3, y: 3 }),
]);

async function begin() {
  if (!graphRef.value) return;

  graphRef.value.add(pointA);
  graphRef.value.add(pointB);
  graphRef.value.add(pointC);
  graphRef.value.add(theFunction);

  // Add residuals to the scene
  residuals.forEach(r => graphRef.value!.add(r));
}

async function update() {
  if (!graphRef.value) return;

  const points = [pointA, pointB, pointC];
  
  // Capture the starting state before the animation begins
  const startA = 0; // or whatever your baseline is
  const startB = 0;

  await graphRef.value.play(
    graphRef.value.animate.parameterChange(
      'linear-fit',
      0, // progress start
      1, // progress end
      (t) => {
        // 1. Interpolate both parameters based on progress t
        const currentA = startA + t * (a.value - startA);
        const currentB = startB + t * (b.value - startB);

        // 2. Update the Function with both parameters
        theFunction.f = (x) => currentA * x + currentB;
        theFunction.updatePoints();

        // 3. Update Residuals to match the new intercept and slope
        residuals.forEach((line, i) => {
          const p = points[i];
          line.from.x = p.at.x;
          line.from.y = p.at.y;

          line.to.x = p.at.x;
          // Calculate target Y using the updated intercept
          line.to.y = currentA * p.at.x + currentB;
        });
      }
    )
  );
}
</script>

<template>
  <ArticleSection title="Introduction" id="introduction">
    <ArticleMathGraph ref="graphRef"/>
    <button @click="begin">Begin</button>
    <button @click="update">Update</button>
    <input type="number" v-model="a"/>
    <input type="number" v-model="b"/>
 </ArticleSection>
</template>
