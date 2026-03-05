import { AnimationFactory } from './animations/';
import type { BaseAnimation } from './animations';

import type { ObjectStyle } from './core';

import { CameraObject } from '@math-objects';
import type { MathObject } from '@math-objects';

import type { RenderContext } from './core';
import { BaseRenderer } from './renderers/';

import { DEFAULT_CAMERA } from '~/shared/constants/graph';

import * as d3 from 'd3';

export class Engine2D{
  public readonly animate:AnimationFactory;

  private m_svg:d3.Selection<SVGSVGElement,unknown,null,undefined>;
  private m_root:d3.Selection<SVGGElement,unknown,null,undefined>;

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
  private m_renderers=new Map<string,BaseRenderer<MathObject>>;

  public constructor(svgElement:SVGSVGElement){
    this.m_svg=d3.select(svgElement);
    this.m_root=this.m_svg
      .append('g')
      .attr('class','root');

    this.m_width=svgElement.clientWidth
    this.m_height=svgElement.clientHeight;

    this.m_svg.attr('viewBox',`0 0 ${this.m_width} ${this.m_height}`);

    this.m_needsUpdate=true;

    this.initZoom();
    this.updateScalesFromCamera();
    this.animate=new AnimationFactory(this);
  }

  public get root():d3.Selection<SVGGElement,unknown,null,undefined>{
    return this.m_root;
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
      for(let index=0;index<this.m_animations.length;index++){
        const anim=this.m_animations[index];
        if(!anim)continue;

        const elapsed=now-anim.startTime;
        const alpha=Math.min(elapsed/anim.duration,1);

        anim.update(alpha);

        if(alpha===1){
          anim.resolve();
          this.m_animations.splice(index,1);
        }
        this.m_needsUpdate=true;
      }
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

  public registerRenderer(name:string,renderer:BaseRenderer<MathObject>){
    this.m_renderers.set(name,renderer);
  }

  public requestUpdate(){
    this.m_needsUpdate=true;
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
