import type { ComponentType } from '@adriytkr/engine';
import { ArcGeometry, Camera2D, PolygonGeometry, PolylineGeometry, Transform } from '@adriytkr/std';
import type { Geometry, IRendererAdapter } from '@adriytkr/std';

import * as PIXI from 'pixi.js';
import type { CommandBuffer, DrawCommand } from '~~/packages/std/src/common/systems/CommandBuffer';

export type CommandHandler=(buffer:DrawCommand<any,any,any>,camera:Camera2D)=>void;

export class PixiRendererAdapter implements IRendererAdapter{
  public root:PIXI.Container=new PIXI.Container();
  private handlers=new Map<string,CommandHandler>();

  public constructor(private renderer:PIXI.Renderer){
    this.handlers.set('polyline',this.drawPolyline);
    // this.handlers.set(PolygonGeometry,this.drawPolygon);
    // this.handlers.set(ArcGeometry,this.drawArc);
  }

  public execute(buffer:CommandBuffer<any>,camera:Camera2D):void{
    for(const command of buffer.commands){
      const handler=this.handlers.get(command.topology);
      if(!handler)continue;
      handler.call(this,command,camera);
    }
  }

  private drawPolyline(
    buffer:DrawCommand<any,any,any>,
    camera:Camera2D,
  ):void{
    const {geometry,style,transform}=buffer;
    if(geometry.points.length===0)return;

    const graphics=new PIXI.Graphics();

    graphics.setStrokeStyle({
      width:style.strokeWidth,
      color:style.stroke,
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

  // private drawPolygon(
  //   geometry:PolygonGeometry,
  //   transform:Transform,
  //   camera:Camera2D,
  // ):void{
  //   if(geometry.config.vertices.length===0)return;

  //   const graphics=new PIXI.Graphics();

  //   graphics.setStrokeStyle({
  //     width:geometry.style.strokeWidth,
  //     color:geometry.style.stroke,
  //   });
  //   graphics.setFillStyle({
  //     color:geometry.style.fill,
  //   });

  //   const first=this.applyTransform(geometry.config.vertices[0]!,transform,camera);
  //   graphics.moveTo(first.x,first.y);

  //   for(let i=1;i<geometry.config.vertices.length;i++){
  //     const p=this.applyTransform(geometry.config.vertices[i]!,transform,camera);
  //     graphics.lineTo(p.x,p.y);
  //   }

  //   graphics.closePath();
  //   graphics.fill();
  //   graphics.stroke();

  //   this.root.addChild(graphics);
  // }

  // private drawArc(
  //   geometry:ArcGeometry,
  //   transform:Transform,
  //   camera:Camera2D,
  // ):void{
  //   const graphics=new PIXI.Graphics();

  //   graphics.setStrokeStyle({
  //     width:geometry.style.strokeWidth,
  //     color:geometry.style.stroke,
  //   });
  //   graphics.setFillStyle({
  //     color:geometry.style.fill,
  //   });

  //   const center=this.applyTransform(transform.localPosition,transform,camera);
  //   const worldScale=Math.max(transform.worldScale.x,transform.worldScale.y);
  //   const screenRadius=geometry.config.radius*worldScale*camera.zoom;

  //   graphics.moveTo(center.x,center.y);
  //   graphics.arc(
  //     center.x,
  //     center.y,
  //     screenRadius,
  //     geometry.config.startAngle,
  //     geometry.config.endAngle,
  //   );

  //   graphics.fill();
  //   graphics.stroke();
  //   this.root.addChild(graphics);
  // }

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
