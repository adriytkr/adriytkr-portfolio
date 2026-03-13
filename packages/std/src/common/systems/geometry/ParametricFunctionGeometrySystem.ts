import type { ISystem, World } from '@adriytkr/engine';
import { DirtyTag, Renderable, Transform } from '../../components';
import { DEFAULT_FUNCTION_STYLE, FunctionStyle, ParametricFunctionObject } from '../../components/math/';
import type { Point } from '../../../types';
import type { PixiDrawCommand } from '@adriytkr/pixi-renderer-2d';

export class ParametricFunctionGeometrySystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(DirtyTag,ParametricFunctionObject,Renderable,Transform)){
      console.log(entity);
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)! as Renderable<PixiDrawCommand>;
      const func=world.getComponent(entity,ParametricFunctionObject)!;
      const style=world.getComponent(entity,FunctionStyle)??DEFAULT_FUNCTION_STYLE;

      const points:Point[]=[];
      const dt=(func.tDomain[1]-func.tDomain[0])/func.samples;
      for(let t=func.tDomain[0];t<=func.tDomain[1];t+=dt){
        points.push({x:func.x(t),y:func.y(t),z:0});
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

