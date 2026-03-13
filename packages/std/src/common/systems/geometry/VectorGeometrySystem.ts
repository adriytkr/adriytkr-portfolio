import type { ISystem, World } from '@adriytkr/engine';
import { DirtyTag, Renderable, Transform } from '../../components';
import { DEFAULT_VECTOR_STYLE, VectorObject, VectorStyle } from '../../components/math/';
import type { PixiDrawCommand } from '@adriytkr/pixi-renderer-2d';

export class VectorGeometrySystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(DirtyTag,VectorObject,Renderable,Transform)){
      console.log(entity);
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)! as Renderable<PixiDrawCommand>;
      const vector=world.getComponent(entity,VectorObject)!;
      const style=world.getComponent(entity,VectorStyle)??DEFAULT_VECTOR_STYLE;

      renderable.primitives.push({
        topology:'polyline',
        geometry:{points:[{x:0,y:0,z:0},vector.to]},
        style:{
          stroke:style.lineStroke,
          strokeWidth:style.lineStrokeWidth,
        },
        transform,
      });

      const size=0.3;
      const dx=vector.to.x;
      const dy=vector.to.y;
      const length=Math.sqrt(dx**2+dy**2);
      const ux=dx/length;
      const uy=dy/length;
      const px=-uy*size;
      const py=ux*size;
      const base1={x:vector.to.x-ux*size+px,y:vector.to.y-uy*size+py,z:0};
      const base2={x:vector.to.x-ux*size-px,y:vector.to.y-uy*size-py,z:0};

      renderable.primitives.push({
        topology:'polygon',
        geometry:{
          vertices:[vector.to,base1,base2]
        },
        style:{
          fill:style.tipFill,
          stroke:style.tipStroke,
          strokeWidth:style.tipStrokeWidth,
        },
        transform,
      });
    }
  }
}
