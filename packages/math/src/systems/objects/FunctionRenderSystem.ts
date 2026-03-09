import type { ISystem, World } from '@adriytkr/engine';

import { MathFunction } from '@adriytkr/math';

import { Transform } from '@adriytkr/std';

import { PolylineGeometry } from '../../components/geometry/PolylineGeometry';

export class FunctionRenderSystem implements ISystem{
  public update(world:World,delta:number):void{
    const entities=world.query(Transform,MathFunction);
    for(const entity of entities){
      const func=world.getComponent(entity,MathFunction)!;
      const points=[];
      const [min,max]=func.domain;
      const step=(max-min)/200;

      for(let i=0;i<=200;i++){
        const x=min+step*i;
        const y=func.fn(x);
        points.push(x,y);
      }

      world.addComponent(entity,new PolylineGeometry(new Float32Array(points)));
    }
  }
}
