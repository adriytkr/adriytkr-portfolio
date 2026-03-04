import type { MathObject, MathObjectType } from '~/shared/types/math/math-objects/bases';
import type { ObjectStyle } from '~/shared/types/math/engine/api';
import type { BaseAnimation } from '~/shared/types/math/engine/animations/BaseAnimation';
import { CameraObject } from '~/shared/types/math/math-objects/CameraObject';
import type { RenderContext } from '~/shared/types/math/engine/core';
import type { BaseRenderer } from '~/shared/types/math/engine/renderers/BaseRenderer';

import {DEFAULT_CAMERA} from '~/shared/constants/graph';

import * as d3 from 'd3';
import { AnimationFactory } from '~/shared/types/math/engine/AnimationFactory';

export class Engine{
  public readonly animate:AnimationFactory;

  private m_svg:d3.Selection<SVGSVGElement,unknown,null,undefined>;
  private _root:d3.Selection<SVGGElement,unknown,null,undefined>;

  private m_width=0;
  private m_height=0;

  private m_baseXScale:d3.ScaleLinear<number,number>|undefined;
  private m_baseYScale:d3.ScaleLinear<number,number>|undefined;
  private m_currentXScale!:d3.ScaleLinear<number,number>;
  private m_currentYScale!:d3.ScaleLinear<number,number>;

  private m_objects:MathObject[]=[];
  private m_objectStyles=new WeakMap<MathObject,ObjectStyle>();
  private m_animations:BaseAnimation[]=[];
  private m_cameras:CameraObject[]=[];
  private m_activeCamera:CameraObject=DEFAULT_CAMERA;
  private m_needsUpdate=false;
  private m_renderers=new Map<MathObjectType,BaseRenderer<MathObject>>;

  public constructor(svgElement:SVGSVGElement){
    this.m_svg=d3.select(svgElement);
    this._root=this.m_svg
      .append('g')
      .attr('class','root');

    this.m_width=svgElement.clientWidth
    this.m_height=svgElement.clientHeight;

    this.m_svg.attr('viewBox',`0 0 ${this.m_width} ${this.m_height}`);

    this.m_renderers.set('point',new PointRenderer(this._root));
    this.m_renderers.set('function',new FunctionRenderer(this._root));
    this.m_renderers.set('vector',new VectorRenderer(this._root));

    this.m_svg
      .append('defs')
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

    this.m_needsUpdate=true;

    this.initZoom();
    this.updateScalesFromCamera();
    this.animate=new AnimationFactory(this);
  }

  private initZoom(){
    const zoomBehavior=d3
      .zoom<SVGSVGElement,unknown>()
      .scaleExtent([0.5,10])
      .on('zoom',(event)=>{
        const {transform}=event;

        const newXScale=transform.rescaleX(this.m_baseXScale);
        const newYScale=transform.rescaleY(this.m_baseYScale);

        this.m_activeCamera.domain=newXScale.domain();
        this.m_activeCamera.range=newYScale.domain();

        this.m_needsUpdate=true;
      });
    this.m_svg.call(zoomBehavior);
  }

  public play=(...anims:BaseAnimation[])=>{
    return Promise.all(
      anims.map(anim=>
        new Promise<void>(resolve=>{
          anim.setup();
          anim.startTime=performance.now();
          anim.resolve=resolve;
          this.m_animations.push(anim);
        })
      ),
    );
  }

  private tick=(now:number)=>{
    requestAnimationFrame(this.tick);
    if(this.m_animations.length===0&&!this.m_needsUpdate)return;

    if(this.m_animations.length>0){
      this.m_animations.forEach((anim,index)=>{
        const elapsed=now-anim.startTime;
        const alpha=Math.min(elapsed/anim.duration,1);

        anim.update(alpha);

        if(alpha===1){
          anim.resolve();
          this.m_animations.splice(index,1);
        }
        this.m_needsUpdate=true;
      });
    }

    if(this.m_needsUpdate){
      this.updateScalesFromCamera();
      this.updateScene();
      this.m_needsUpdate=false;
    }
  }

  public startAnimationLoop=()=>{
    requestAnimationFrame(this.tick);
  }

  private updateScalesFromCamera=()=>{
    if(!this.m_baseXScale||!this.m_baseYScale){
      this.m_baseXScale=d3
        .scaleLinear()
        .domain(this.m_activeCamera.domain)
        .range([0,this.m_width]);
      this.m_baseYScale=d3
        .scaleLinear()
        .domain(this.m_activeCamera.range)
        .range([this.m_height,0]);

      this.m_currentXScale=this.m_baseXScale.copy();
      this.m_currentYScale=this.m_baseYScale.copy();
    }

    this.m_currentXScale
      .domain(this.m_activeCamera.domain)
      .range([0,this.m_width]);
    this.m_currentYScale
      .domain(this.m_activeCamera.range)
      .range([this.m_height,0]);
  }

  public setActiveCamera=(camera:CameraObject)=>{
    this.m_activeCamera=camera;

    this.m_baseXScale=undefined;
    this.m_baseYScale=undefined;
    this.updateScalesFromCamera();

    this.m_svg.call(
      d3.zoom<SVGSVGElement,unknown>().transform,
      d3.zoomIdentity
    );

    this.initZoom();
    this.updateScene();
  }

  private updateScene(){
    const context:RenderContext={
      xScale:this.m_currentXScale,
      yScale:this.m_currentYScale,
      activeCamera:this.m_activeCamera,
      getObjectStyle:this.getObjectStyle,
    };

    this.m_renderers.forEach((renderer,type)=>{
      const objs=this.m_objects.filter(object=>object.type===type);
      renderer.render(objs,context);
    });
  }

  public add=(object:MathObject)=>{
    if(object instanceof CameraObject){
      this.m_cameras.push(object);
      if(!this.m_activeCamera)this.setActiveCamera(object);
    }else{
      this.m_objects.push(object);
      this.m_objectStyles.set(object,{opacity:1});
      this.m_needsUpdate=true;
    }
  }

  public remove=(object:MathObject)=>{
    this.m_objects=this.m_objects.filter(o=>o.id!==object.id);
    this.m_needsUpdate=true;
  }

  public clear=()=>{
    this.m_objects=[];
    this.m_renderers.forEach(renderer=>renderer.clear());
    this.m_needsUpdate=true;
  }

  public getObjectStyle=(object:MathObject):ObjectStyle=>{
    let style=this.m_objectStyles.get(object);
    if(!style){
      style={opacity:1};
      this.m_objectStyles.set(object,{opacity:1});
    }
    return style;
  }
}
