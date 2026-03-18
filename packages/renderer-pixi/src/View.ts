import * as PIXI from 'pixi.js';
import type { Camera } from '@adriytkr/math';

export interface WorldContext{
  camera:Camera;
  app:PIXI.Application,
}

export abstract class View{
  public graphics=new PIXI.Graphics();
  protected unsubscribers:(()=>void)[]=[];

  public context!:WorldContext;

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

  protected project(worldX: number, worldY: number): { x: number; y: number } {
    const camera=this.context.camera;
    const zoom=camera.zoom$.value;
    
    // 1. Calculate the center of the canvas in pixels
    const centerX=this.context.app.screen.width / 2;
    const centerY=this.context.app.screen.height / 2;

    // 2. Transform: (World - CameraOffset) * Zoom + ScreenCenter
    // Note: We subtract camera.x because if the camera moves RIGHT, 
    // the objects should move LEFT on the screen.
    return {
      x: centerX + (worldX - camera.position.x$.value) * zoom,
      y: centerY - (worldY - camera.position.y$.value) * zoom // Negated for Math Y-Up
    };
  }
}
