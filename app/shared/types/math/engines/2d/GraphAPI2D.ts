import type { IGraphAPI2D } from './core';

import type { BaseAnimation } from './animations';

import type { MathObject } from '@math-objects';

import { Engine2D } from './Engine2D';
import type { BaseRenderer } from './renderers';

export class GraphAPI2D implements IGraphAPI2D{
  private m_engine:Engine2D|null=null;

  public isReady=false;

  public get root(){
    if(!this.m_engine)throw Error('Engine is unmounted');
    return this.m_engine.root;
  }

  public init(svg:SVGSVGElement){
    this.m_engine=new Engine2D(svg);
    this.isReady=true;
  }

  public startAnimationLoop(){
    if(!this.m_engine)return;
    this.m_engine.startAnimationLoop();
  }

  public add(object:MathObject){
    if(!this.m_engine)return;
    this.m_engine.add(object);
  }

  public remove(object:MathObject){
    if(!this.m_engine)return;
    this.m_engine.remove(object);
  }

  public clear(){
    if(!this.m_engine)return;
    this.m_engine.clear();
  }

  public play(...animations:BaseAnimation[]):Promise<void[]>{
    if(!this.m_engine)return Promise.resolve([]);
    return this.m_engine.play(...animations);
  }

  public setActiveCamera(camera:CameraObject){
    if(!this.m_engine)return;
    this.m_engine.setActiveCamera(camera);
  }

  public get animate(){
    if(!this.m_engine)
      throw Error('Engine is unmounted');

    return this.m_engine.animate;
  }

  public requestUpdate(){
    if(!this.m_engine)return;
    this.m_engine.requestUpdate();
  }

  public registerRenderer(name:string,renderer:BaseRenderer<MathObject>){
    if(!this.m_engine)return;
    this.m_engine.registerRenderer(name,renderer);
  }
}
