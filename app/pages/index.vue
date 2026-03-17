<script setup lang="ts">
import * as PIXI from 'pixi.js';

const canvasRef=ref<HTMLCanvasElement|null>(null);

type Subscriber=(value:any)=>void;

class GameObject{
  private m_watchers:Map<string,Subscriber[]>=new Map();

  public watch(property:string,fn:Subscriber){
    if(!this.m_watchers.has(property))
      this.m_watchers.set(property,[]);

    this.m_watchers.get(property)!.push(fn);
  }

  public notify(property:string,value:any){
    const watchers=this.m_watchers.get(property);
    if(watchers)
      watchers.forEach(fn=>fn(value));
  }
}

class Square extends GameObject{
  private m_side:number;
  private m_color:number;

  constructor(side:number,color:number) {
    super();
    this.m_side=side;
    this.m_color=color;
  }

  public get side(){
    return this.m_side;
  }

  public set side(val:number){
    this.m_side=val;
    this.notify('side',val);
  }

  public get color(){
    return this.m_color;
  }

  set color(val:number){
    this.m_color=val;
    this.notify('color',val);
  }
}

// function createConstraint(dependencies:GameObject[],update:()=>void){
//   update();

//   dependencies.forEach(dependency=>{
//     dependency.subscribe(update);
//   });
// }

// const pointA=new Point(0,0);
// const pointB=new Point(10,10);

// function midpoint(pointA:Point,pointB:Point){
//   const mid=new Point();

//   createConstraint([pointA,pointB],()=>{
//     mid.x=(pointA.x+pointB.x)/2;
//     mid.y=(pointA.y+pointB.y)/2;
//   });

//   return mid;
// }

// const m=midpoint(pointA,pointB);

const mySquare=new Square(50,0xff0000);

mySquare.watch('color',(newColor)=>{
  console.log(`The square is now ${newColor.toString(16)}!`);
});

mySquare.side=100;
mySquare.color=0x00ff00;

function update(){
  mySquare.color=0xff0000;
}

function bindSquare(square:Square,graphics:PIXI.Graphics){
  const redraw=()=>{
    graphics.clear();
    graphics.rect(0,0,square.side,square.side);
    graphics.fill();
  };
  redraw();

  square.watch('side',redraw);

  square.watch('color',(c)=>{
    graphics.tint=c; 
  });
}

onMounted(async()=>{
  if(canvasRef.value===null)return;

  canvasRef.value.width=canvasRef.value.clientWidth;
  canvasRef.value.height=canvasRef.value.clientHeight;

  const app=await PIXI.autoDetectRenderer({
    canvas:canvasRef.value,
    width:canvasRef.value.width,
    height:canvasRef.value.height,
  });
  const root=new PIXI.Container();
  const squareGraphics=new PIXI.Graphics();
  const square=new Square(100,0xff0000);
  root.addChild(squareGraphics);
  bindSquare(square,squareGraphics);

  let lastTime=0;
  function loop(time:number){
    const delta=(time-lastTime)/1000;
    lastTime=time;
    app.render(root);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
});
</script>

<template>
  <h1>Hello, World!</h1>
  <canvas ref="canvasRef"></canvas>
  <button @click="update">update</button>
</template>

<style scoped>
canvas{
  width:100%;
  height:500px;
  border:1px solid black;
  display:block;
}
</style>
