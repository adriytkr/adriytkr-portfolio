import type { Camera2D, IRendererAdapter, PolylineGeometry, Transform } from '@adriytkr/std';

import * as PIXI from 'pixi.js';

export class PixiRendererAdapter implements IRendererAdapter{
  public root:PIXI.Container=new PIXI.Container();

  public constructor(private renderer:PIXI.Renderer){}

  public draw(geometry:PolylineGeometry,transform:Transform,camera:Camera2D):void{
    if(geometry.points.length===0)return;

    const graphics=new PIXI.Graphics();

    graphics.setStrokeStyle({
      width:1,
      color:0xff0000,
    });

    const first=this.applyTransform(geometry.points[0]!,transform,camera);
    graphics.moveTo(first.x,first.y);

    for(let i=1;i<geometry.points.length;i++){
      const p=this.applyTransform(geometry.points[i]!,transform,camera);
      graphics.lineTo(p.x,p.y);
    }

    graphics.stroke();

    this.root.addChild(graphics);
  }

  private applyTransform(
    point:{x:number;y:number},
    transform:Transform,
    camera:Camera2D,
  ){
    let x=point.x*transform.worldScale.x;
    let y=point.y*transform.worldScale.y;

    const theta=2*Math.atan2(transform.worldRotation.z,transform.worldRotation.w);
    const cosR=Math.cos(theta);
    const sinR=Math.sin(theta);

    const xRot=x*cosR-y*sinR;
    const yRot=x*sinR+y*cosR;

    x=xRot+transform.worldPosition.x;
    y=yRot+transform.worldPosition.y;

    const screenX=(x-camera.x)*camera.zoom+camera.width/2;
    const screenY=(camera.y-y)*camera.zoom+camera.height/2;

    return {x:screenX,y:screenY,z:0};
  }
}
