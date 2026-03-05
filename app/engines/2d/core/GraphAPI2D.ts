import type { BaseAnimation } from './BaseAnimation';
import type { MathObject } from '@math-objects';

import { Engine2D } from './Engine2D';
import type { SceneNode } from './SceneNode';

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

  public add=<T extends MathObject>(node:SceneNode<T>|CameraObject)=>{
    if(!this.m_engine) throw Error('Engine is unmounted');
    this.m_engine.add(node);
  }

  public remove=<T extends MathObject>(node:SceneNode<T>)=>{
    if(!this.m_engine)return;
    this.m_engine.remove(node);
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

  public requestUpdate(){
    if(!this.m_engine)return;
    this.m_engine.requestUpdate();
  }
}
