import type { ISystem, World } from '@adriytkr/engine';
import { DirtyTag, Renderable, Transform } from '../../components';
import { DEFAULT_FUNCTION_STYLE, FunctionObject, FunctionStyle } from '../../components/math/';
import type { Point } from '../../../types';
import type { PixiDrawCommand } from '@adriytkr/pixi-renderer-2d';

export class FunctionGeometrySystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(DirtyTag,FunctionObject,Renderable,Transform)){
      console.log(entity);
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)! as Renderable<PixiDrawCommand>;
      const func=world.getComponent(entity,FunctionObject)!;
      const style=world.getComponent(entity,FunctionStyle)??DEFAULT_FUNCTION_STYLE;

      const points:Point[]=[];
      const dx=(func.domain[1]-func.domain[0])/func.samples;
      for(let x=func.domain[0];x<=func.domain[1];x+=dx){
        points.push({x,y:func.fn(x),z:0});
      }

      renderable.primitives.length=0;
      renderable.primitives.push({
        topology:'polyline',
        geometry:{points},
        style:{
          stroke:style.stroke,
          strokeWidth:style.strokeWidth,
        },
        transform,
      });
    }
  }
}
