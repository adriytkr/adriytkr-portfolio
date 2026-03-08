import { World } from '@adriytkr/engine';
import type { Entity,ISystem } from '@adriytkr/engine';
import { Hierarchy } from '../components/Hierarchy';
import { Transform } from '../components/Transform';

export class TransformSystem implements ISystem{
  public update(world:World,dt:number):void{
    const entities=world.query(Transform);

    for(const entity of entities){
      this.ensureUpdated(world,entity);
    }
  }

private ensureUpdated(world:World,entity:Entity):void{
    const transform=world.getComponent(entity,Transform)!;
    // if(!transform.isDirty)return;

    const hierarchy=world.getComponent(entity,Hierarchy)!;
    if(hierarchy.parent!==null){
      this.ensureUpdated(world,hierarchy.parent); 
      const parentTransformation=world.getComponent(hierarchy.parent,Transform)!;
      
      transform.worldPosition.x=parentTransformation.worldPosition.x+transform.localPosition.x;
      transform.worldPosition.y=parentTransformation.worldPosition.y+transform.localPosition.y;
      transform.worldPosition.z=parentTransformation.worldPosition.z+transform.localPosition.z;
    }else{
      transform.worldPosition.x=transform.localPosition.x;
      transform.worldPosition.y=transform.localPosition.y;
      transform.worldPosition.z=transform.localPosition.z;
    }

    // transform.isDirty=false;
  }
}
