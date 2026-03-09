import type { ISystem,World } from '@adriytkr/engine';
import { MathCanvas, MathPosition, MathVector, Renderable } from '../components';

import * as PIXI from 'pixi.js';

export class VectorRenderSystem implements ISystem{
  public update(world:World,delta:number):void{
    const entities=world.query(MathPosition,Renderable,MathVector);

    for(const entity of entities){
      const mathPosition=world.getComponent(entity,MathPosition)!;
      const renderable=world.getComponent(entity,Renderable)!;
      const mathVector=world.getComponent(entity,MathVector)!;
      const canvas=world.getComponent(mathPosition.canvasEntity,MathCanvas)!;

      const g=renderable.container as PIXI.Graphics;
      g.clear();

      const startX=canvas.origin.x+(mathPosition.x*canvas.unitSize);
      const startY=canvas.origin.y-(mathPosition.y*canvas.unitSize);
      
      const endX=startX+(mathVector.toX*canvas.unitSize);
      const endY=startY-(mathVector.toY*canvas.unitSize);

      g.lineStyle(3,0xff0000);
      g.moveTo(startX,startY);
      g.lineTo(endX,endY);

      const angle=Math.atan2(endY-startY,endX-startX);
      const headSize=10;

      g.beginFill(0xff0000);
      g.moveTo(endX,endY);
      g.lineTo(
        endX-headSize*Math.cos(angle-Math.PI/6),
        endY-headSize*Math.sin(angle-Math.PI/6),
      );
      g.lineTo(
        endX-headSize*Math.cos(angle+Math.PI/6),
        endY-headSize*Math.sin(angle+Math.PI/6),
      );
      g.closePath();
      g.endFill();
    }
  }
}
