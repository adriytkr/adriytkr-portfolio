import * as PIXI from 'pixi.js';

import type { AbstractConstructor, ConcreteConstructor, Constructor } from './types';
import { View, type WorldContext } from './View';
import { Camera, GameObject } from '@adriytkr/math';

export class Scene{
  private m_app:PIXI.Application;
  private m_registry=new Map<Constructor<GameObject>,ConcreteConstructor<View>>();
  private m_activePairs=new Map<GameObject,View>(); 
  private m_activeCamera:Camera;

  public constructor(app:PIXI.Application,camera:Camera){
    this.m_app=app;
    this.m_activeCamera=camera;
  }

  public get stage():PIXI.Container{
    return this.m_app.stage;
  }

  public register<G extends GameObject,V extends View>(
    gameClass:Constructor<G>,
    viewClass:ConcreteConstructor<V>,
  ):void{
    this.m_registry.set(gameClass,viewClass);
  }

  private getViewConstructor(gameClass:any):ConcreteConstructor<View>|null{
    if(this.m_registry.has(gameClass))
      return this.m_registry.get(gameClass)!;

    const parentClass=Object.getPrototypeOf(gameClass);
    if(parentClass&&parentClass!==Object)
      return this.getViewConstructor(parentClass);

    return null;
  }

  public add(gameObject:GameObject){
    if(this.m_activePairs.has(gameObject)){
      console.warn('Object already exists on the scene');
      return;
    }

    const ViewClass=this.getViewConstructor(gameObject.constructor);

    if(ViewClass===null)
      throw Error(`No View registered for ${gameObject.constructor.name} or its parent`);

    const view=new ViewClass(gameObject);

    const context:WorldContext={
      app:this.m_app,
      camera:this.m_activeCamera,
    };
    view.setContext(context);

    view.init();
    view.redraw();

    this.m_activePairs.set(gameObject,view);
    this.m_app.stage.addChild(view.graphics);
  }

  public remove(gameObject:GameObject):void{
    const view=this.m_activePairs.get(gameObject);

    if(view!==undefined){
      view.destroy();
      this.m_activePairs.delete(gameObject);
    }
  }
}
