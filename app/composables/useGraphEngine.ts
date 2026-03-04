import { AbstractFunctionObject } from '~/shared/types/math/math-objects/AbstractFunctionObject';
import type { MathObject } from '~/shared/types/math/math-objects/bases';

import * as d3 from 'd3';

export default function(){
  const containerRef=ref<SVGSVGElement|null>(null);
  const svgSelection=ref<d3.Selection<SVGSVGElement,unknown,null,undefined>|null>(null);
  const components=reactive<GraphComponents>({});

  const theWidth=ref(0);
  const theHeight=ref(0);
  let baseXScale:d3.ScaleLinear<number,number>;
  let baseYScale:d3.ScaleLinear<number,number>;
  let currentXScale:d3.ScaleLinear<number,number>;
  let currentYScale:d3.ScaleLinear<number,number>;

  const objects=ref<MathObject[]>([]);

  function init(){
    initSVG();
    initGroups();
    initScales();
    initArrowMarker();
  }

  function initScales(){
    baseXScale=d3
      .scaleLinear()
      .domain([-3,3])
      .range([0,theWidth.value]);
    currentXScale=baseXScale;

    baseYScale=d3
      .scaleLinear()
      .domain([-3,3])
      .range([theHeight.value,0]);
    currentYScale=baseYScale;
  }

  function initSVG(){
    if(!containerRef.value)return;

    theWidth.value=containerRef.value.clientWidth;
    theHeight.value=containerRef.value.clientHeight;
    svgSelection.value=d3
      .select(containerRef.value)
      .attr('viewBox',`0 0 ${theWidth.value} ${theHeight.value}`);
  }

  function initGroups(){
    components.root=svgSelection.value!
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
    if(!svgSelection.value)return;

    const defs=svgSelection.value.append('defs');

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

  function renderPoints(){
    if(!components.points)return;

    const points=objects.value.filter(object=>object instanceof PointObject);
    components.points
      .selectAll<SVGCircleElement,PointObject>('circle')
      .data(points,p=>p.id)
      .join('circle')
      .attr('data-id',p=>p.id)
      .attr('r',p=>p.size)
      .attr('fill','black')
      .attr('cx',p=>currentXScale(p.at.x))
      .attr('cy',p=>currentYScale(p.at.y));
  }

  function renderVectors(){
    if(!components.vectors)return;

    const vectors=objects.value.filter(object=>object instanceof VectorObject);
    components.vectors
      .selectAll<SVGLineElement,VectorObject>('line')
      .data(vectors,v=>v.id)
      .join('line')
      .attr('data-id',v=>v.id)
      .attr('stroke','black')
      .attr('stroke-width',3)
      .attr('marker-end','url(#arrow)')
      .attr('x1',v=>currentXScale(v.from.x))
      .attr('y1',v=>currentYScale(v.from.y))
      .attr('x2',v=>currentXScale(v.to.x))
      .attr('y2',v=>currentYScale(v.to.y));
  }

  function renderFunctions(){
    if(!components.functions)return;

    const path=d3
      .line<Point>()
      .x(p=>currentXScale(p.x))
      .y(p=>currentYScale(p.y));
    const functions=objects.value.filter(object=>object instanceof AbstractFunctionObject);
    components.functions
      .selectAll<SVGPathElement,AbstractFunctionObject>('path')
      .data(functions,f=>f.id)
      .join('path')
      .attr('data-id',f=>f.id)
      .attr('fill','none')
      .attr('stroke','black')
      .attr('stroke-width',2)
      .attr('d',f=>path(f.points));
  }

  function render(){
    renderPoints();
    renderVectors();
    renderFunctions();
  }

  function add(object:MathObject){
    objects.value.push(object);
    render();
  }

  function remove(object:MathObject){
    if(!components.root)return;

    objects.value=objects.value.filter(o=>o.id!==object.id);
    components.root
      .selectAll(`[data-id="${object.id}"]`)
      .remove();
  }

  function clear(){
    objects.value=[];

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

  onMounted(init);

  return{
    containerRef,
    add,
    remove,
    clear,
  };
}

// to do later
// group math objects
// add lerp function
