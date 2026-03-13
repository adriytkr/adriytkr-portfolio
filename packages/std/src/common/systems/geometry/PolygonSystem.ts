import type { ISystem, World } from '@adriytkr/engine';
import { ClosedStyle, DEFAULT_CLOSED_STYLE, PolygonObject } from '../../components/math/';
import { DirtyTag, Renderable, Transform } from '../../components';
import type { PixiDrawCommand } from '@adriytkr/pixi-renderer-2d';

export class PolygonSystem implements ISystem{
  public update(world:World,delta:number){
    for(const entity of world.query(DirtyTag,PolygonObject,Renderable,Transform)){
      console.log(entity);
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)! as Renderable<PixiDrawCommand>;
      const polygon=world.getComponent(entity,PolygonObject)!;
      const style=world.getComponent(entity,ClosedStyle)??DEFAULT_CLOSED_STYLE;

      renderable.primitives.length=0;
      renderable.primitives.push({
        topology:'polygon',
        geometry:{vertices:polygon.vertices},
        style:{
          stroke:style.stroke,
          strokeWidth:style.strokeWidth,
          fill:style.fill,
        },
        transform,
      });
    }
  }
}
