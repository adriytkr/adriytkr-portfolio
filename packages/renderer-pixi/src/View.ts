import * as PIXI from 'pixi.js';
import type { Camera, GameObject, IVector2 } from '@adriytkr/math';

export interface WorldContext{
  camera:Camera;
  app:PIXI.Application,
}

export abstract class View<T extends GameObject>{
  public graphics=new PIXI.Graphics();
  protected m_model:T;

  protected unsubscribers:(()=>void)[]=[];

  public context!:WorldContext;

  public constructor(model:T){
    this.m_model=model;
  }

  public setContext(context:WorldContext):void{
    this.context=context;
  }

  public abstract init():void;
  public abstract redraw():void;

  public destroy():void{
    this.unsubscribers.forEach(unsub=>unsub());
    this.unsubscribers.length=0;
    this.graphics.destroy({children:true,texture:true});
  }

  public mark(fn:()=>void):void{
    this.unsubscribers.push(fn);
  }

  protected project(worldX:number,worldY:number):IVector2{
    const camera=this.context.camera;
    const zoom=camera.zoom$.value;
    
    const centerX=this.context.app.screen.width/2;
    const centerY=this.context.app.screen.height/2;

    return{
      x:centerX+(worldX-camera.position.x$.value)*zoom,
      y:centerY-(worldY-camera.position.y$.value)*zoom,
    };
  }
}
