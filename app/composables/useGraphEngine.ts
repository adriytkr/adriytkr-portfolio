import { AbstractFunctionObject } from '~/shared/types/math/math-objects/AbstractFunctionObject';
import type { MathObject } from '~/shared/types/math/math-objects/bases';
import type { AnimationOptions, Animations, ObjectStyle } from '~/shared/types/math/engine/api';
import type { BaseAnimation } from '~/shared/types/math/engine/animations/BaseAnimation';
import { FadeInAnimation } from '~/shared/types/math/engine/animations/FadeInAnimation';
import { FadeOutAnimation } from '~/shared/types/math/engine/animations/FadeOutAnimation';
import { ShiftAnimation } from '~/shared/types/math/engine/animations/ShiftAnimation';
import { CameraObject } from '~/shared/types/math/math-objects/CameraObject';

import * as d3 from 'd3';

export default function(){
  const containerRef=ref<SVGSVGElement|null>(null);
  let svgSelection:d3.Selection<SVGSVGElement,unknown,null,undefined>|null=null;
  const components:GraphComponents={};

  const theWidth=ref(0);
  const theHeight=ref(0);
  let baseXScale:d3.ScaleLinear<number,number>|undefined;
  let baseYScale:d3.ScaleLinear<number,number>|undefined;
  let currentXScale:d3.ScaleLinear<number,number>;
  let currentYScale:d3.ScaleLinear<number,number>;

  let objects:MathObject[]=[];
  let objectStyles=new WeakMap<MathObject,ObjectStyle>();
  let animations:BaseAnimation[]=[];
  let cameras:CameraObject[]=[];
  let activeCamera:CameraObject|null=null;

  let needsUpdate=false;

  function play(...anims:BaseAnimation[]){
    return Promise.all(
      anims.map(anim=>
        new Promise<void>(resolve=>{
          anim.setup();
          anim.startTime=performance.now();
          anim.resolve=resolve;
          animations.push(anim);
        })
      ),
    );
  }

  function tick(now:number){
    if(animations.length>0){
      animations.forEach((anim,index)=>{
        const elapsed=now-anim.startTime;
        const alpha=Math.min(elapsed/anim.duration,1);

        anim.update(alpha);

        if(alpha===1){
          anim.resolve();
          animations.splice(index,1);
        }
        needsUpdate=true;
      });
    }

    if(needsUpdate){
      updateScalesFromCamera();
      updateScene();
      needsUpdate=false;
    }
    requestAnimationFrame(tick);
  }

  function init(){
    initSVG();
    initGroups();
    updateScalesFromCamera();
    initArrowMarker();
    startAnimationLoop();
  }

  function initZoom(){
    if(!svgSelection||!activeCamera)return;

    const zoomBehavior=d3
      .zoom<SVGSVGElement,unknown>()
      .scaleExtent([0.5,10])
      .on('zoom',(event)=>{
        const {transform}=event;

        const newXScale=transform.rescaleX(baseXScale);
        const newYScale=transform.rescaleY(baseYScale);

        if(activeCamera){
          activeCamera.domain=newXScale.domain();
          activeCamera.range=newYScale.domain();
        }

        needsUpdate=true;
      });

    svgSelection.call(zoomBehavior);
  }

  function startAnimationLoop(){
    requestAnimationFrame(tick);
  }

  function updateScalesFromCamera(){
    if(!activeCamera)return;

    if(!baseXScale||!baseYScale){
      baseXScale=d3
        .scaleLinear()
        .domain(activeCamera.domain)
        .range([0,theWidth.value]);
      baseYScale=d3
        .scaleLinear()
        .domain(activeCamera.range)
        .range([theHeight.value,0]);
    }

    currentXScale=d3.
      scaleLinear()
      .domain(activeCamera.domain)
      .range([0,theWidth.value]);
    currentYScale=d3.
      scaleLinear()
      .domain(activeCamera.range)
      .range([theHeight.value,0]);
  }

  function setActiveCamera(camera:CameraObject){
    activeCamera=camera;

    baseXScale=undefined;
    baseYScale=undefined;
    updateScalesFromCamera();

    if(svgSelection)
      svgSelection.call(
        d3.zoom<SVGSVGElement,unknown>().transform,
        d3.zoomIdentity
      );

    initZoom();
    updateScene();
  }

  function initSVG(){
    if(!containerRef.value)return;

    theWidth.value=containerRef.value.clientWidth;
    theHeight.value=containerRef.value.clientHeight;
    svgSelection=d3
      .select(containerRef.value)
      .attr('viewBox',`0 0 ${theWidth.value} ${theHeight.value}`);
  }

  function initGroups(){
    if(!svgSelection)return;

    components.root=svgSelection
      .append('g')
      .attr('class','root');
    components.points=components.root
      .append('g')
      .attr('class','points');
    components.vectors=components.root
      .append('g')
      .attr('class','vectors');
    components.functions=components.root
      .append('g')
      .attr('class','functions');
  }

  function initArrowMarker(){
    if(!svgSelection)return;

    const defs=svgSelection.append('defs');

    defs
      .append('marker')
      .attr('id','arrow')
      .attr('viewBox','0 0 10 10')
      .attr('refX',10)
      .attr('refY',5)
      .attr('markerWidth',6)
      .attr('markerHeight',6)
      .attr('orient','auto')
      .append('path')
      .attr('d','M 0 0 L 10 5 L 0 10 z')
      .attr('fill','black');
  }

  function mountPoints(){
    if(!components.points)return;

    const points=objects.filter(object=>object instanceof PointObject);
    components.points
      .selectAll<SVGCircleElement,PointObject>('circle')
      .data(points,p=>p.id)
      .join('circle')
      .attr('data-id',p=>p.id)
      .attr('class','point')
      .attr('r',p=>p.size)
      .attr('fill','black')
      .style('opacity',p=>getObjectStyle(p).opacity)
      .attr('cx',p=>currentXScale(p.at.x))
      .attr('cy',p=>currentYScale(p.at.y));
  }

  function mountVectors(){
    if(!components.vectors)return;

    const vectors=objects.filter(object=>object instanceof VectorObject);
    components.vectors
      .selectAll<SVGLineElement,VectorObject>('line')
      .data(vectors,v=>v.id)
      .join('line')
      .attr('data-id',v=>v.id)
      .attr('class','vector')
      .attr('stroke','black')
      .attr('stroke-width',3)
      .attr('marker-end','url(#arrow)')
      .style('opacity',v=>getObjectStyle(v).opacity)
      .attr('x1',v=>currentXScale(v.from.x))
      .attr('y1',v=>currentYScale(v.from.y))
      .attr('x2',v=>currentXScale(v.to.x))
      .attr('y2',v=>currentYScale(v.to.y));
  }

  function mountFunctions(){
    if(!components.functions)return;

    const path=d3
      .line<Point>()
      .x(p=>currentXScale(p.x))
      .y(p=>currentYScale(p.y));
    const functions=objects.filter(object=>object instanceof AbstractFunctionObject);
    components.functions
      .selectAll<SVGPathElement,AbstractFunctionObject>('path')
      .data(functions,f=>f.id)
      .join('path')
      .attr('data-id',f=>f.id)
      .attr('class','function')
      .attr('fill','none')
      .attr('stroke','black')
      .attr('stroke-width',2)
      .attr('d',f=>path(f.points));
  }

  function mountAll(){
    mountPoints();
    mountVectors();
    mountFunctions();
  }

  function updatePoints(){
    if(!components.points)return;
    components.points
      .selectAll<SVGCircleElement, PointObject>('.point')
      .style('opacity',p=>getObjectStyle(p).opacity)
      .attr('cx',p=>currentXScale(p.at.x))
      .attr('cy',p=>currentYScale(p.at.y));
  }

  function updateVectors(){
    if(!components.vectors)return;
    components.vectors
      .selectAll<SVGLineElement,VectorObject>('.vector')
      .style('opacity',v=>getObjectStyle(v).opacity)
      .attr('x1',v=>currentXScale(v.from.x))
      .attr('y1',v=>currentYScale(v.from.y))
      .attr('x2',v=>currentXScale(v.to.x))
      .attr('y2',v=>currentYScale(v.to.y));
  }

  function updateFunctions(){
    if(!components.functions)return;
    const path=d3
      .line<Point>()
      .x(p=>currentXScale(p.x))
      .y(p=>currentYScale(p.y));
    components.functions
      .selectAll<SVGPathElement,AbstractFunctionObject>('.function')
      .style('opacity',f=>getObjectStyle(f).opacity)
      .attr('d',f=>path(f.points));
  }

  function updateScene(){
    updatePoints();
    updateVectors();
    updateFunctions();
  }

  function getObjectStyle(object:MathObject){
    let style=objectStyles.get(object);
    if(!style){
      style={opacity:1};
      objectStyles.set(object,{opacity:1});
    }
    return style;
  };

  function add(object:MathObject){
    if(object instanceof CameraObject){
      cameras.push(object);
      if(!activeCamera)setActiveCamera(object);
    }else{
      objects.push(object);
      objectStyles.set(object,{opacity:1});
      mountAll();
    }
  }

  function remove(object:MathObject){
    if(!components.root)return;

    objects=objects.filter(o=>o.id!==object.id);
    components.root
      .selectAll(`[data-id="${object.id}"]`)
      .remove();
  }

  function clear(){
    objects=[];

    if(components.points)
      components.points
        .selectAll('*')
        .remove();
    if(components.vectors)
      components.vectors
        .selectAll('*')
        .remove();
    if(components.functions)
      components.functions
        .selectAll('*')
        .remove();
  }

  const animate:Animations={
    fadeIn(object:MathObject,options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS){
      const style=getObjectStyle(object);
      return new FadeInAnimation(object,style,options);
    },
    fadeOut(object:MathObject,options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS){
      const style=getObjectStyle(object);
      return new FadeOutAnimation(object,style,options);
    },
    shift:(object:Shiftable,delta:Point,options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS)=>
      new ShiftAnimation(object,delta,options),
    moveCamera:(
      camera:CameraObject,
      targetDomain:Interval,
      targetRange:Interval,
      options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS
    )=>new CameraTransition(camera,targetDomain,targetRange,options),
  };

  onMounted(init);

  return{
    containerRef,
    add,
    remove,
    clear,
    play,
    setActiveCamera,
    animate,
  };
}

// group math objects
// add lerp function
