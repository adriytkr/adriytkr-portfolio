import type { ISystem,World } from '@adriytkr/engine';
import { Renderable,Transform } from '../components';

import * as PIXI from 'pixi.js';
import { Camera2D } from '../../2d';

export class RendererSystem implements ISystem{
  public root:PIXI.Container=new PIXI.Container();

  public constructor(private renderer:PIXI.Renderer){}

  public update(world:World,delta:number):void{
    const entities=world.query(Transform,Renderable);
    const cameraEntity=world.query(Camera2D)[0]!;

    if(cameraEntity===undefined)
      throw Error('No camera?!');

    const camera=world.getComponent(cameraEntity,Camera2D)!;

    for(const entity of entities){
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)!;

      for(const command of renderable.drawCommands){
        const g=new PIXI.Graphics();
        switch(command.type){
          case 'polyline':
            g.setStrokeStyle({
              width:1,
              color:0xff0000,
            });

            if(command.points.length>0){
              const first=this.applyTransform(command.points[0]!,transform,camera);
              g.moveTo(first.x,first.y);

              for(let i=1;i<command.points.length;i++){
                const p=this.applyTransform(command.points[i]!,transform,camera);
                g.lineTo(p.x,p.y);
              }

              g.stroke();
            }

            this.root.addChild(g);
            break;
          case 'polygon':
            g.setStrokeStyle({
              width:1,
              color:0xff0000,
            });
            g.setFillStyle({
              color:0xffffff,
            });

            if(command.vertices.length>0){
              const first=this.applyTransform(command.vertices[0]!,transform,camera);
              g.moveTo(first.x,first.y);

              for(let i=1;i<command.vertices.length;i++){
                const p=this.applyTransform(command.vertices[i]!,transform,camera);
                g.lineTo(p.x,p.y);
              }

              g.closePath();
              g.fill();
              g.stroke();
            }

            this.root.addChild(g);
            break;
        }
      }
    }

    this.renderer.render({
      container:this.root,
    });
  }

  private applyTransform(point:{x:number;y:number},transform:Transform,camera:Camera2D){
    let x=point.x*transform.scale.x;
    let y=point.y*transform.scale.y;

    x+=transform.worldPosition.x;
    y+=transform.worldPosition.y;

    const screenX=(x-camera.x)*camera.zoom+camera.width/2;
    const screenY=(camera.y-y)*camera.zoom+camera.height/2;

    return{x:screenX,y:screenY};
  }
}
