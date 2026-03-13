import type { ISystem, World } from '@adriytkr/engine';
import { ClosedStyle, DEFAULT_CLOSED_STYLE, RegularPolygonObject } from '../../components/math/';
import { DirtyTag, Renderable, Transform } from '../../components';
import type { Point } from '../../../types';
import type { PixiDrawCommand } from '@adriytkr/pixi-renderer-2d';

export class RegularPolygonSystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(DirtyTag,RegularPolygonObject,Renderable,Transform)){
      console.log(entity);
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)! as Renderable<PixiDrawCommand>;
      const geometry=world.getComponent(entity,RegularPolygonObject)!;
      const style=world.getComponent(entity,ClosedStyle)??DEFAULT_CLOSED_STYLE;

      const vertices:Point[]=[];

      const radius=geometry.sidelength/(2*Math.sin(Math.PI/geometry.sides));

      const step=2*Math.PI/geometry.sides;
      const offsetAngle=geometry.offsetAngle===undefined?((geometry.sides%2===0)?step/2:Math.PI/2):geometry.offsetAngle;

      for(let i=0;i<geometry.sides;i++){
        const angle=i*step+offsetAngle;

        vertices.push({
          x:radius*Math.cos(angle),
          y:radius*Math.sin(angle),
          z:0,
        });
      }

      renderable.primitives.length=0;
      renderable.primitives.push({
        topology:'polygon',
        geometry:{vertices},
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
