import type { ISystem, World } from '@adriytkr/engine';
import { DirtyTag, Renderable, Transform } from '../../components';
import { DEFAULT_GRID_STYLE, GridObject, GridStyle } from '../../components/math/';
import type { Point } from '../../../types';
import type { PixiDrawCommand } from '@adriytkr/pixi-renderer-2d';

export class GridGeometrySystem implements ISystem{
  public update(world:World,delta:number):void{
    for(const entity of world.query(DirtyTag,GridObject,Renderable,Transform)){
      console.log(entity);
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)! as Renderable<PixiDrawCommand>;
      const grid=world.getComponent(entity,GridObject)!;
      const style=world.getComponent(entity,GridStyle)??DEFAULT_GRID_STYLE;

      const {xMin,xMax,yMin,yMax,xStep,yStep}=grid;

      renderable.primitives.length=0;

      const primitives:PixiDrawCommand[]=[];

      for(let x=xMin;x<=xMax;x+=xStep){
        const points:Point[]=[
          {x,y:yMin,z:0},
          {x,y:yMax,z:0},
        ];
        primitives.push({
          topology:'polyline',
          geometry:{points},
          style:{
            stroke:style.stroke,
            strokeWidth:style.strokeWidth,
          },
          transform,
        });
      }

      for(let y=yMin;y<=yMax;y+=yStep){
        const points:Point[]=[
          {x:xMin,y,z:0},
          {x:xMax,y,z:0},
        ];
        primitives.push({
          topology: 'polyline',
          geometry: { points },
          style:{
            stroke:style.stroke,
            strokeWidth:style.strokeWidth,
          },
          transform,
        });
      }

      renderable.primitives.push(...primitives);
    }
  }
}
