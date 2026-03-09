import { World } from '@adriytkr/engine';
import type { Entity,ISystem } from '@adriytkr/engine';
import { Hierarchy } from '../components/Hierarchy';
import { Transform } from '../components/Transform';

export class TransformSystem implements ISystem{
  public update(world:World,dt:number):void{
    const entities=world.query(Transform,Hierarchy);

    for(const entity of entities){
      this.ensureUpdated(world,entity);
    }
  }

  private multiplyQuaternions(
    a:{x:number,y:number,z:number,w:number},
    b:{x:number,y:number,z:number,w:number}
  ){
    return {
      w:a.w*b.w-a.x*b.x-a.y*b.y-a.z*b.z,
      x:a.w*b.x+a.x*b.w+a.y*b.z-a.z*b.y,
      y:a.w*b.y-a.x*b.z+a.y*b.w+a.z*b.x,
      z:a.w*b.z+a.x*b.y-a.y*b.x+a.z*b.w,
    };
  }

  private ensureUpdated(world:World,entity:Entity):void{
    const transform=world.getComponent(entity,Transform)!;
    const hierarchy=world.getComponent(entity,Hierarchy)!;

    if(hierarchy.parent!==null){
      this.ensureUpdated(world,hierarchy.parent); 
      const parentTransform=world.getComponent(hierarchy.parent,Transform)!;

      transform.worldPosition.x=parentTransform.worldPosition.x+transform.localPosition.x;
      transform.worldPosition.y=parentTransform.worldPosition.y+transform.localPosition.y;
      transform.worldPosition.z=parentTransform.worldPosition.z+transform.localPosition.z;

      transform.worldRotation=this.multiplyQuaternions(
        parentTransform.worldRotation,
        transform.localRotation
      );

      transform.worldScale={
        x:parentTransform.localScale.x*transform.localScale.x,
        y:parentTransform.localScale.y*transform.localScale.y,
        z:parentTransform.localScale.z*transform.localScale.z,
      };
    }else{
      transform.worldPosition.x=transform.localPosition.x;
      transform.worldPosition.y=transform.localPosition.y;
      transform.worldPosition.z=transform.localPosition.z;
      transform.worldRotation={...transform.localRotation};
      transform.worldScale={...transform.localScale};
    }
  }
}
