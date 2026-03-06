import type { BaseAnimation } from '@engines/shared/core/BaseAnimation';
import type { SceneNode } from '@engines/shared/core/SceneNode';
import { Engine2D } from './Engine2D';
import type { RenderContext2D } from './core';
import type { CameraObject } from './CameraObject';

export class GraphAPI2D{
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

  public add(
    node:SceneNode<any,any,d3.Selection<SVGGElement,unknown,null,undefined>,RenderContext2D>|CameraObject
  ){
    if(!this.m_engine) throw Error('Engine is unmounted');
    this.m_engine.add(node);
  }

  public remove(
    node:SceneNode<any,any,d3.Selection<SVGGElement,unknown,null,undefined>,RenderContext2D>
  ){
    if(!this.m_engine)return;
    this.m_engine.remove(node);
  }

  public clear(){
    if(!this.m_engine)return;
    this.m_engine.clear();
  }

  public play(...animations:BaseAnimation<RenderContext2D>[]):Promise<void[]>{
    if(!this.m_engine)return Promise.resolve([]);
    return this.m_engine.play(...animations);
  }

  public setActiveCamera(camera:CameraObject){
    if(!this.m_engine)return;
    this.m_engine.setActiveCamera(camera);
  }

  public requestUpdate(){
    if(!this.m_engine)return;
    this.m_engine.requestUpdate();
  }
}
