import { Transform,MathPosition,MathCanvas } from '../components';
import type { ISystem, World } from '@adriytkr/engine';

export class MathCoordinateSystem implements ISystem{
  public update(world:World,delta:number):void{
    const entities=world.query(MathPosition,Transform);

    for(const entity of entities){
      const mathPosition=world.getComponent(entity,MathPosition)!;
      const transform=world.getComponent(entity,Transform)!;

      const canvas=world.getComponent(mathPosition.canvasEntity,MathCanvas)!;

      transform.localPosition.x=canvas.origin.x+(mathPosition.x*canvas.unitSize);
      transform.localPosition.y=canvas.origin.y+(mathPosition.y*canvas.unitSize);
    }
  }
}
