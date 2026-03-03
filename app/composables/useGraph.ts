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
    initZoom();
  }

  function initZoom(){
    const zoom=d3
      .zoom<SVGSVGElement,unknown>()
      .on('zoom',e=>{
        const transform=e.transform;
        currentXScale=transform.rescaleX(baseXScale);
        currentYScale=transform.rescaleY(baseYScale);

        addAxes();
        updateScene();
      });

    svgSelection.value?.call(zoom);
  }

  function updateScene(){
    // Update Points
      if(components.points)
        components.points
          .selectAll<SVGCircleElement,PointObject>('circle')
          .attr('cx',p=>currentXScale(p.at.x))
          .attr('cy',p=>currentYScale(p.at.y));

      // Update Vectors
      if(components.vectors)
        components.vectors
          .selectAll<SVGLineElement,VectorObject>('line')
          .attr('x1',v=>currentXScale(v.from.x))
          .attr('y1',v=>currentYScale(v.from.y))
          .attr('x2',v=>currentXScale(v.to.x))
          .attr('y2',v=>currentYScale(v.to.y));
  }

  function initScales(){
    baseXScale=d3
      .scaleLinear()
      .domain([3,10])
      .range([0,theWidth.value]);
    currentXScale=baseXScale;

    baseYScale=d3
      .scaleLinear()
      .domain([3,10])
      .range([theHeight.value,0]);
    currentYScale=baseYScale;
  }

  function initSVG(){
    if(!containerRef.value)return;

    theWidth.value=containerRef.value?.clientWidth;
    theHeight.value=containerRef.value?.clientHeight;
    svgSelection.value=d3
      .select(containerRef.value)
      .attr('viewBox',`0 0 ${theWidth.value} ${theHeight.value}`);
  }

  function initGroups(){
    components.root=svgSelection.value!.append('g');
    components.points=components.root.append('g').attr('class','points');
    components.vectors=components.root.append('g').attr('class','vectors');
    components.functions=components.root.append('g').attr('class','functions');
    components.shapes=components.root.append('g').attr('class','shapes');
    components.grids=components.root.append('g').attr('class','grids');
    components.axes=components.root.append('g').attr('class','axes');
  }

  function addAxes(){
    if(!components.axes)return;
    components.axes
      .selectAll('*')
      .remove();

    const xAxisGenerator=d3
      .axisBottom(currentXScale)
      .tickSize(0)
      .tickPadding(6)
      .ticks(10)
      .tickFormat(d=>{
        const n=+d;
        return Number.isInteger(n)?n.toFixed(0):n.toString();
      });
    const yAxisGenerator=d3
      .axisLeft(currentYScale)
      .tickSize(0)
      .ticks(10)
      .tickFormat(d=>{
        const n=+d;
        if(n===0)return'';
        return Number.isInteger(n)?n.toFixed(0):n.toString();
      });

    const domain=currentXScale.domain() as Interval;
    const range=currentYScale.domain() as Interval;
    const xAxisPosition=
      isNumberInInterval(0,range)
        ?currentYScale(0)
        :range[1]<0?0:theHeight.value-20;
    const yAxisPosition=
      isNumberInInterval(0,domain)
        ?currentXScale(0)
        :domain[1]<0?theWidth.value:20;

    const xAxisGroup=components.axes
      .append('g')
      .attr('class','x-axis')
      .attr('transform',`translate(0,${xAxisPosition})`)
      .call(xAxisGenerator);
    const yAxisGroup=components.axes
      .append('g')
      .attr('class','y-axis')
      .attr('transform',`translate(${yAxisPosition},0)`)
      .call(yAxisGenerator);

    // move 0 out of the y-axis
    const r=xAxisGroup
      .selectAll('text')
      .filter(d=>d===0)
      .attr('dx','-8px');

    // hide axis line
    if(!isNumberInInterval(0,range))
      xAxisGroup
        .select('.domain')
        .style('opacity',0);
    if(!isNumberInInterval(0,domain))
      yAxisGroup
        .select('.domain')
        .style('opacity',0);
  } 

  function initArrowMarker(){
    if(!svgSelection.value)return;

    const defs=svgSelection.value.append('defs');

    defs.append('marker')
      .attr('id','arrow')
      .attr('viewBox','0 0 10 10')
      .attr('refX',10)
      .attr('refY',5)
      .attr('markerWidth',6)
      .attr('markerHeight',6)
      .attr('orient','auto')
      .append('path')
      .attr('d','M 0 0 L 10 5 L 0 10 z')
      .attr('fill','rgb(var(--text-color))');
  }

  function add(object:MathObject){
    objects.value.push(object);

    if(object instanceof PointObject&&components.points){
      return components.points
        .append('circle')
        .datum(object)
        .attr('data-id',object.id)
        .attr('r',object.size)
        .attr('fill','black')
        .attr('cx',currentXScale(object.at.x))
        .attr('cy',currentYScale(object.at.y));
    }else if(object instanceof VectorObject&&components.vectors){
      return components.vectors
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
    }else if(object instanceof FunctionObject&&components.functions){
      const path=d3
        .line<Point>()
        .x(p=>currentXScale(p.x))
        .y(p=>currentYScale(p.y));
      return components.functions
        .append('path')
        .attr('data-id',object.id)
        .datum(object)
        .attr('fill','none')
        .attr('stroke','black')
        .attr('stroke-width',2)
        .attr('d',path(object.points));
    }else if(object instanceof LineObject&&components.shapes){
      return components.shapes
        .append('line')
        .datum(object)
        .attr('data-id',object.id)
        .attr('stroke','black')
        .attr('stroke-width',3)
        .attr('x1',currentXScale(object.from.x))
        .attr('y1',currentYScale(object.from.y))
        .attr('x2',currentXScale(object.to.x))
        .attr('y2',currentYScale(object.to.y))
    }
  }

  function remove(object:MathObject){
    objects.value=objects.value.filter(o=>o.id!==object.id);
  }

  function clear(){
    objects.value=[];
  }

  async function play(...animations:LazyAnimation[]):Promise<void>{
    const promises=animations.map(a=>a());
    await Promise.all(promises);
  }

  function fadeIn(
    object:MathObject,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  ):LazyAnimation{
    return async()=>{
      if(!components.points||!components.vectors)return;
      const selection=add(object);
      if(!selection)return;
      return new Promise<void>(resolve=>{
        selection
          .style('opacity',0)
          .transition()
          .duration(options.duration)
          .style('opacity',1)
          .on('end',()=>resolve());
      });
    };
  }

  function growVector(
    vector:Growable&MathObject,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  ):LazyAnimation{
    return async()=>{
      if(!components.vectors)return;
      const selection=add(vector) as d3.Selection<SVGLineElement, unknown, null, undefined>|undefined;
      if(!selection)return;
      return new Promise<void>(resolve=>{
        selection
          .attr('x2',currentXScale(vector.from.x))
          .attr('y2',currentYScale(vector.from.y))
          .transition()
          .duration(options.duration)
          .attr('x2',currentXScale(vector.to.x))
          .attr('y2',currentYScale(vector.to.y))
          .on('end',()=>resolve());
      });
    };
  }

  const fetchElement=(object:MathObject)=>
      d3.select(`[data-id="${object.id}"]`);

  const removeObject=(object:MathObject)=>{
    objects.value=objects.value.filter(o=>o.id!==object.id);
  };

  function fadeOut(
    object:MathObject,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS
  ):LazyAnimation{
    return async()=>{
      if(!components.vectors||!components.points)return;
      const selection=fetchElement(object);
      if(!selection)return;
      return new Promise<void>(resolve=>{
        selection
          .transition()
          .duration(options.duration)
          .style('opacity',0)
          .on('end',()=>{
            removeObject(object);
            selection.remove();
            resolve();
          });
      });
    };
  }

  function ungrowVector(
    vector:VectorObject,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS
  ):LazyAnimation{
    return async()=>{
      if(!components.vectors||!components.points)return;
      const selection=fetchElement(vector);
      if(!selection)return;
      return new Promise<void>(resolve=>{
        selection
          .transition()
          .duration(options.duration)
          .attr('x2',currentXScale(vector.from.x))
          .attr('y2',currentYScale(vector.from.y))
          .on('end',()=>{
            removeObject(vector);
            selection.remove();
            resolve();
          });
      });
    };
  }

  function moveTo(
    object:MathObject,
    target:Point,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS
  ):LazyAnimation{
    return async()=>{
      if(!components.vectors||!components.points)return;
      const selection=fetchElement(object);
      if(!selection)return;
      return new Promise<void>(resolve=>{
        if(object instanceof PointObject){
          const start={...object.at};
          const dx=target.x-start.x;
          const dy=target.y-start.y;

          selection
            .transition()
            .duration(options.duration)
            .tween('move',()=>(alpha:number)=>{
              object.at.x=start.x+alpha*dx;
              object.at.y=start.y+alpha*dy;
              selection
                .attr('cx',currentXScale(object.at.x))
                .attr('cy',currentYScale(object.at.y));
            })
            .on('end',()=>resolve());
        }else if(object instanceof VectorObject){
          const startFrom={...object.from};
          const startTo={...object.to};
          const dx=target.x-startFrom.x;
          const dy=target.y-startFrom.y;

          selection
            .transition()
            .duration(options.duration)
            .tween('move',()=>(alpha:number)=>{
              object.from.x=startFrom.x+alpha*dx;
              object.from.y=startFrom.y+alpha*dy;
              object.to.x=startTo.x+alpha*dx;
              object.to.y=startTo.y+alpha*dy;

              selection
                .attr('x1',currentXScale(object.from.x))
                .attr('y1',currentYScale(object.from.y))
                .attr('x2',currentXScale(object.to.x))
                .attr('y2',currentYScale(object.to.y));
            })
            .on('end',()=>resolve());
        }
      });
    };
  }

  function shift(
    object:MathObject,
    delta:Point,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS
  ):LazyAnimation{
    return async()=>{
      if(!components.vectors||!components.points)return;
      const selection=fetchElement(object);
      if(!selection)return;
      return new Promise<void>(resolve=>{
        if(object instanceof PointObject){
          moveTo(object,delta,options);
        }else if(object instanceof VectorObject){
          const startFrom={...object.from};
          const startTo={...object.to};

          selection
            .transition()
            .duration(options.duration)
            .tween('move',()=>(alpha:number)=>{
              object.from.x=startFrom.x+alpha*delta.x;
              object.from.y=startFrom.y+alpha*delta.y;
              object.to.x=startTo.x+alpha*delta.x;
              object.to.y=startTo.y+alpha*delta.y;

              selection
                .attr('x1',currentXScale(object.from.x))
                .attr('y1',currentYScale(object.from.y))
                .attr('x2',currentXScale(object.to.x))
                .attr('y2',currentYScale(object.to.y));
            })
            .on('end',()=>resolve());
        }
      });
    };
  }

  function applyMatrixToPoint(p: Point, theMatrix: Matrix2x2): Point {
    const [[a,b],[c,d]] = theMatrix;
    return {
      x: a*p.x + b*p.y,
      y: c*p.x + d*p.y
    };
  }

  function applyMatrix(
    object:MathObject,
    theMatrix:Matrix2x2,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS
  ):LazyAnimation{
    return async()=>{
      if(!components.points||!components.vectors)return;
      const selection=fetchElement(object);
      if(!selection)return;

      return new Promise<void>(resolve=>{
        const [a,b]=theMatrix[0];
        const [c,d]=theMatrix[1];

        if(object instanceof PointObject){
          const start:Point={...object.at};
          selection
            .transition()
            .duration(options.duration)
            .tween('matrix',()=>(alpha:number)=>{
              object.at.x=start.x*(1-alpha)+alpha*(a*start.x+b*start.y);
              object.at.y=start.y*(1-alpha)+alpha*(c*start.x+d*start.y);

              selection
                .attr('cx',currentXScale(object.at.x))
                .attr('cy',currentYScale(object.at.y));
            })
            .on('end',()=>resolve());
        }else if(object instanceof VectorObject){
            const startTo:Point={...object.to};
            selection
              .transition()
              .duration(options.duration)
              .tween('matrix2',()=>(alpha:number)=>{
                object.to.x=startTo.x*(1-alpha)+alpha*(a*startTo.x+b*startTo.y);
                object.to.y=startTo.y*(1-alpha)+alpha*(c*startTo.x+d*startTo.y);

                selection
                  .attr('x2', currentXScale(object.to.x))
                  .attr('y2', currentYScale(object.to.y));
              })
              .on('end',()=>resolve());
        }
      });
    };
  }

  onMounted(init);

  return{
    containerRef,
    add,
    remove,
    clear,
    play,
    fadeIn,
    growVector,
    fadeOut,
    ungrowVector,
    moveTo,
    shift,
    applyMatrix,
    addAxes,
  };
}
