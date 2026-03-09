import type { ISystem,World } from '@adriytkr/engine';
import { PolylineGeometry,CircleGeometry } from '../components/geometry';
import { Transform } from '@adriytkr/std';

import { CircleStyle,LineStyle,PixiGraphics, Vector, VectorStyle } from '../components';

import { Camera2D } from '@adriytkr/std/2d/index';

import * as PIXI from 'pixi.js';

export class PixiRendererSystem implements ISystem{
  private root=new PIXI.Container();

  public constructor(private renderer:PIXI.Renderer){}

  public update(world:World,delta:number):void{
    function worldToScreen(x:number,y:number,camera:Camera2D):[number,number]{
      const sx=(x-camera.x)*camera.zoom+camera.width/2;
      const sy=-(y-camera.y)*camera.zoom+camera.height/2;
      return[sx,sy];
    }

    const cameraEntity=world.query(Camera2D)[0]!;
    const camera=world.getComponent(cameraEntity,Camera2D)!;

    for(const entity of world.query(Transform,PolylineGeometry)){
      const geometry=world.getComponent(entity,PolylineGeometry)!;
      const style=world.getComponent(entity,LineStyle);
      const transform=world.getComponent(entity,Transform)!;

      let graphics=world.getComponent(entity,PixiGraphics)?.graphics;
      if(!graphics){
        graphics=new PIXI.Graphics();
        world.addComponent(entity,new PixiGraphics(graphics));
        this.root.addChild(graphics);
      }

      graphics.clear();

      graphics.setStrokeStyle({
        width:style?.width??2,
        color:style?.stroke??0xff0000,
      });

      const pts=geometry.points;

      if(pts[0]===undefined||pts[1]===undefined)continue;

      const [sx0,sy0]=worldToScreen(
        pts[0]+transform.localPosition.x,
        pts[1]+transform.localPosition.y,
        camera,
      );
      graphics.moveTo(sx0,sy0);

      for(let i=2;i<pts.length;i+=2){
        const x=pts[i]!+transform.localPosition.x;
        const y=pts[i+1]!+transform.localPosition.y;

        const [sx,sy]=worldToScreen(
          x+transform.localPosition.x,
          y+transform.localPosition.y,
          camera,
        );
        graphics.lineTo(sx,sy);
      }

      graphics.stroke();
    }

    for(const entity of world.query(Transform,CircleGeometry)){
      const geometry=world.getComponent(entity,CircleGeometry)!;
      const style=world.getComponent(entity,CircleStyle);
      const transform=world.getComponent(entity,Transform)!;

      let graphics=world.getComponent(entity,PixiGraphics)?.graphics;
      if(!graphics){
        graphics=new PIXI.Graphics();
        world.addComponent(entity,new PixiGraphics(graphics));
        this.root.addChild(graphics);
      }

      graphics.clear();

      graphics.setStrokeStyle({
        width:style?.width??2,
        color:style?.stroke??0xff0000,
      });
      graphics.setFillStyle({
        color:style?.fill??0xf0f0f0,
      });

      const cx=transform.localPosition.x;
      const cy=transform.localPosition.y;
      const r=geometry.radius;

      const [sx,sy]=worldToScreen(cx,cy,camera);

      graphics.circle(sx,sy,r*camera.zoom);
      graphics.fill();
      graphics.stroke();
    }

    for(const entity of world.query(Transform,Vector)){
      const transform=world.getComponent(entity,Transform)!;
      const vector=world.getComponent(entity,Vector)!;
      const style=world.getComponent(entity,VectorStyle);

      let graphics=world.getComponent(entity, PixiGraphics)?.graphics;
      if(!graphics){
        graphics=new PIXI.Graphics();
        world.addComponent(entity,new PixiGraphics(graphics));
        this.root.addChild(graphics);
      }

      graphics.clear();
      graphics.setStrokeStyle({
        color:style?.lineColor??0xffffff,
      });
      graphics.setFillStyle({
        color:style?.headColor??0xffffff,
      });

      const [sx0,sy0]=worldToScreen(
        transform.localPosition.x,
        transform.localPosition.y,
        camera,
      );
      const [sx1,sy1]=worldToScreen(
        transform.localPosition.x+vector.toX,
        transform.localPosition.y+vector.toY,
        camera,
      );

      graphics.moveTo(sx0,sy0);
      graphics.lineTo(sx1,sy1);

      const arrowSize=12;
      const angle=Math.atan2(sy1-sy0,sx1-sx0);

      const p1x=sx1;
      const p1y=sy1;
      const p2x=sx1-arrowSize*Math.cos(angle-Math.PI/6);
      const p2y=sy1-arrowSize*Math.sin(angle-Math.PI/6);
      const p3x=sx1-arrowSize*Math.cos(angle+Math.PI/6);
      const p3y=sy1-arrowSize*Math.sin(angle+Math.PI/6);

      graphics.poly([p1x,p1y,p2x,p2y,p3x,p3y]);
      graphics.fill();
      graphics.stroke();
    }

    this.renderer.render(this.root);
  }
}
