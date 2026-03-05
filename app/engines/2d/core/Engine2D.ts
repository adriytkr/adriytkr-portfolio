import type { BaseAnimation } from './BaseAnimation';
import type { RenderContext } from './core';

import { CameraObject } from './CameraObject';
import type { MathObject } from '@math-objects';
import type { SceneNode } from './SceneNode';

import { DEFAULT_CAMERA } from './constants';

import * as d3 from 'd3';

export class Engine2D{
  private m_svg:d3.Selection<SVGSVGElement,unknown,null,undefined>;
  private m_root:d3.Selection<SVGGElement,unknown,null,undefined>;

  private m_width=0;
  private m_height=0;

  private m_baseXScale:d3.ScaleLinear<number,number>|undefined;
  private m_baseYScale:d3.ScaleLinear<number,number>|undefined;
  private m_currentXScale!:d3.ScaleLinear<number,number>;
  private m_currentYScale!:d3.ScaleLinear<number,number>;

  private m_nodes:SceneNode<MathObject>[]=[];

  private m_animations:BaseAnimation[]=[];

  private m_cameras:CameraObject[]=[];
  private m_activeCamera:CameraObject=DEFAULT_CAMERA;

  private m_needsUpdate:boolean=true;

  public constructor(svgElement:SVGSVGElement){
    this.m_svg=d3.select(svgElement);
    this.m_root=this.m_svg
      .append('g')
      .attr('class','root');

    this.m_width=svgElement.clientWidth
    this.m_height=svgElement.clientHeight;

    this.m_svg.attr('viewBox',`0 0 ${this.m_width} ${this.m_height}`);

    this.initZoom();
    this.updateScalesFromCamera();
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

    const isSomeAnimationRunning=this.m_animations.length>0;
    if(!isSomeAnimationRunning&&!this.m_needsUpdate)return;

    if(isSomeAnimationRunning){
      const context=this.getRenderContext();

      this.m_animations=this.m_animations.filter(animation=>{
        const elapsed=now-animation.startTime;
        const alpha=Math.min(elapsed/animation.duration,1);

        animation.update(alpha,context);

        if(alpha===1){
          animation.resolve();
          return false;
        }

        return true;
      });

      this.m_needsUpdate=true;
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

  private getRenderContext=():RenderContext=>({
    xScale:this.m_currentXScale,
    yScale:this.m_currentYScale,
    activeCamera:this.m_activeCamera,
  });

  private updateScene(){
    const context=this.getRenderContext();
    const renderers=Map.groupBy(this.m_nodes,node=>node.renderer);
    renderers.forEach((nodes,renderer)=>{
      if(!renderer.isMounted)
        renderer.mount(this.m_root);
      renderer.render(nodes,context)
    });
  }

  public requestUpdate(){
    this.m_needsUpdate=true;
  }

  public add=<T extends MathObject>(object:SceneNode<T>|CameraObject)=>{
    if(object instanceof CameraObject){
      this.m_cameras.push(object);
      return;
    }

    this.m_nodes.push(object);
    this.m_needsUpdate=true;
  }

  public remove=<T extends MathObject>(node:SceneNode<T>)=>{
    this.m_nodes=this.m_nodes.filter(n=>node.id!==n.id);
    this.m_needsUpdate=true;
  }

  public clear=()=>{
    this.m_nodes=[];
    this.m_needsUpdate=true;
  }
}
