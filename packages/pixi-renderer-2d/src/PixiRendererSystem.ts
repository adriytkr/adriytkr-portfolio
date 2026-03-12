import type { ISystem,World } from '@adriytkr/engine';

import { Renderable,Transform,Camera2D } from '@adriytkr/std';

import type{
  ArcCommand,
  PolygonCommand,
  PolylineCommand,
} from '@adriytkr/std';

import * as PIXI from 'pixi.js';

export class PixiRendererSystem implements ISystem{
  public root:PIXI.Container=new PIXI.Container();

  public constructor(private renderer:PIXI.Renderer){}

  public update(world:World,delta:number):void{
    this.root.removeChildren();

    const entities=world.query(Transform,Renderable);
    const cameraEntity=world.query(Camera2D)[0]!;

    if(cameraEntity===undefined)
      throw Error('No camera?!');

    const camera=world.getComponent(cameraEntity,Camera2D)!;

    for(const entity of entities){
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)!;

      for(const command of renderable.drawCommands){
        const graphics=new PIXI.Graphics();
        graphics.alpha=renderable.opacity;
        switch(command.type){
          case 'polyline':
            this.drawPolyline(graphics,command,camera,transform);
            break;
          case 'polygon':
            this.drawPolygon(graphics,command,camera,transform);
            break;
          case 'arc':
            this.drawArc(graphics,command,camera,transform);
            break;
        }
      }
    }

    this.renderer.render({
      container:this.root,
    });
  }

  private drawPolyline(
    graphics:PIXI.Graphics,
    command:PolylineCommand,
    camera:Camera2D,
    transform:Transform,
  ):void{
    graphics.setStrokeStyle({
      width:1,
      color:command.style.color,
    });

    if(command.points.length>0){
      const first=this.applyTransform(command.points[0]!,transform,camera);
      graphics.moveTo(first.x,first.y);

      for(let i=1;i<command.points.length;i++){
        const p=this.applyTransform(command.points[i]!,transform,camera);
        graphics.lineTo(p.x,p.y);
      }

      graphics.stroke();
    }

    this.root.addChild(graphics);
  }

  private drawPolygon(
    graphics:PIXI.Graphics,
    command:PolygonCommand,
    camera:Camera2D,
    transform:Transform,
  ):void{
    graphics.setStrokeStyle({
      width:1,
      color:command.style.stroke,
    });
    graphics.setFillStyle({
      color:command.style.fill,
    });

    if(command.vertices.length>0){
      const first=this.applyTransform(command.vertices[0]!,transform,camera);
      graphics.moveTo(first.x,first.y);

      for(let i=1;i<command.vertices.length;i++){
        const p=this.applyTransform(command.vertices[i]!,transform,camera);
        graphics.lineTo(p.x,p.y);
      }

      graphics.closePath();
      graphics.fill();
      graphics.stroke();
    }

    this.root.addChild(graphics);
  }

  private drawArc(
    graphics:PIXI.Graphics,
    command:ArcCommand,
    camera:Camera2D,
    transform:Transform,
  ):void{
    graphics.setStrokeStyle({
      width:1,
      color:command.style.stroke,
    });
    graphics.setFillStyle({
      color:command.style.fill,
    });

    const center=this.applyTransform(transform.localPosition,transform,camera);
    const worldScale=Math.max(transform.worldScale.x,transform.worldScale.y);
    const screenRadius=command.radius*worldScale*camera.zoom;

    graphics.moveTo(center.x,center.y);
    graphics.arc(center.x,center.y,screenRadius,command.startAngle,command.endAngle);

    graphics.fill();
    graphics.stroke();

    this.root.addChild(graphics);
  }

  private applyTransform(
    point:{x:number;y:number},
    transform:Transform,
    camera:Camera2D,
  ):Transform{
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
