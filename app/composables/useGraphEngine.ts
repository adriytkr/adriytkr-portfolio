import { MathObject } from '~/shared/types/math/math-objects/bases';
import {AbstractFunctionObject} from '~/shared/types/math/math-objects/AbstractFunctionObject';
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

  function add(object:MathObject){
    if(
      !components.points||
      !components.vectors||
      !components.functions
    )return;

    objects.value.push(object);

    if(object instanceof PointObject){
      components.points
        .append('circle')
        .datum(object)
        .attr('data-id',object.id)
        .attr('r',object.size)
        .attr('fill','black')
        .attr('cx',currentXScale(object.at.x))
        .attr('cy',currentYScale(object.at.y));
    }else if(object instanceof VectorObject){
      components.vectors
        .append('line')
        .datum(object)
        .attr('data-id',object.id)
        .attr('stroke','black')
        .attr('stroke-width',3)
        .attr('marker-end','url(#arrow)')
        .attr('x1',currentXScale(object.from.x))
        .attr('y1',currentYScale(object.from.y))
        .attr('x2',currentXScale(object.to.x))
        .attr('y2',currentYScale(object.to.y));
    }else if(object instanceof AbstractFunctionObject){
      const path=d3
        .line<Point>()
        .x(p=>currentXScale(p.x))
        .y(p=>currentYScale(p.y));
      components.functions
        .append('path')
        .attr('data-id',object.id)
        .datum(object)
        .attr('fill','none')
        .attr('stroke','black')
        .attr('stroke-width',2)
        .attr('d',path(object.points));
    }
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
