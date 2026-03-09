import type { ISystem,World } from '@adriytkr/engine';
import { Transform } from '@adriytkr/std';
import { ParametricCurve, PolylineGeometry } from '../../components';

export class ParametricCurveRenderSystem implements ISystem{
  public update(world:World,delta:number):void{
    const entities=world.query(Transform,ParametricCurve);

    for(const entity of entities){
      const curve=world.getComponent(entity,ParametricCurve)!;
      const points=[];
      const [min,max]=curve.tDomain;
      const step=(max-min)/200;

      for(let i=0;i<=200;i++){
        const t=min+step*i;
        const x=curve.x(t);
        const y=curve.y(t);
        points.push(x,y);
      }

      world.addComponent(entity,new PolylineGeometry(new Float32Array(points)));
    }
  }
}
