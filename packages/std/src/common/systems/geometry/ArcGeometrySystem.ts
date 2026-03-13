import type { ISystem, World } from '@adriytkr/engine';
import { DirtyTag, Renderable, Transform } from '../../components';
import { DEFAULT_CLOSED_STYLE, ArcObject, ClosedStyle } from '../../components/math/';
import type { PixiDrawCommand } from '@adriytkr/pixi-renderer-2d';

export class ArcGeometrySystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(DirtyTag,ArcObject,Renderable,Transform)){
      console.log(entity);
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)! as Renderable<PixiDrawCommand>;
      const arc=world.getComponent(entity,ArcObject)!;
      const style=world.getComponent(entity,ClosedStyle)??DEFAULT_CLOSED_STYLE;

      renderable.primitives.push({
        topology:'arc',
        geometry:{
          radius:arc.radius,
          startAngle:arc.startAngle,
          endAngle:arc.endAngle,
        },
        style:{
          fill:style.fill,
          stroke:style.stroke,
          strokeWidth:style.strokeWidth,
        },
        transform,
      });
    }
  }
}

