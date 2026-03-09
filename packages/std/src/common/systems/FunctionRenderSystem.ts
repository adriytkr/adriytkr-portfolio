import type { ISystem, World } from '@adriytkr/engine';
import { ActiveCameraTag, Camera2D, MathCanvas, MathFunction, Renderable } from '../components';
import * as PIXI from 'pixi.js';

export class FunctionRenderSystem implements ISystem{
  public update(world:World,delta:number):void{
    const entities=world.query(Renderable,MathFunction);

    // Get the active camera once per frame
    const cameraEntity=world.query(Camera2D,ActiveCameraTag)[0]!;
    const camera=world.getComponent(cameraEntity,Camera2D)!;

    for(const entity of entities){
      const mathFunction=world.getComponent(entity,MathFunction)!;
      const renderable=world.getComponent(entity,Renderable)!;
      const canvas=world.getComponent(mathFunction.canvasEntity,MathCanvas)!;
      
      const g=renderable.container as PIXI.Graphics;
      g.clear();

      const viewX0=camera.x-(camera.width/2);
      const viewX1=camera.x+(camera.width/2);
      const [domX0,domX1]=mathFunction.domain;
      const drawX0=Math.max(domX0,viewX0);
      const drawX1=Math.min(domX1,viewX1);

      if(drawX0>=drawX1)continue;

      const step=0.1;

      g.setStrokeStyle({color:0xff0000,width:2});

      let first=true;
      for(let x=drawX0;x<=drawX1;x+=step){
        const y=mathFunction.fn(x);

        if(!isFinite(y)){
          first=true;
          continue;
        }

        const px=canvas.origin.x+(x*canvas.unitSize);
        const py=canvas.origin.y-(y*canvas.unitSize);

        if(first){
          g.moveTo(px,py);
          first=false;
        }else{
          g.lineTo(px,py);
        }
      }

      const finalY=mathFunction.fn(drawX1);
      if (isFinite(finalY)){
        g.lineTo(
          canvas.origin.x+(drawX1*canvas.unitSize),
          canvas.origin.y-(finalY*canvas.unitSize)
        );
      }

      g.stroke();
    }
  }
}
