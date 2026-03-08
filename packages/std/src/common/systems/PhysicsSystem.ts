import type { World,ISystem } from '@adriytkr/engine';
import { Transform } from '../components/Transform';
import { Velocity } from '../components/Velocity';

export class PhysicsSystem implements ISystem{
  public constructor(public gravity:number){}

  update(world:World,delta:number):void{
    const entities=world.query(Transform,Velocity);

    for(const entity of entities){
      const transform=world.getComponent(entity,Transform)!;
      const velocity=world.getComponent(entity,Velocity)!;

      velocity.y+=this.gravity*delta;
      transform.localPosition.x+=velocity.x*delta;
      transform.localPosition.y+=velocity.y*delta;
      transform.localPosition.z+=velocity.z*delta;
    }
  }
}
