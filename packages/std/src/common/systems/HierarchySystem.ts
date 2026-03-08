import { World } from '@adriytkr/engine';
import type { ISystem } from '@adriytkr/engine';
import { Hierarchy } from '../components/Hierarchy';

export class HierarchySystem implements ISystem{
  public update(world:World,delta:number):void{
    const entities=world.query(Hierarchy);

    for(const entity of entities){
      const hierarchy=world.getComponent(entity,Hierarchy)!;

      if(hierarchy.parent===null)continue;

      if(hierarchy.parent){
        const parentHierarchy=world.getComponent(hierarchy.parent,Hierarchy)!;
        parentHierarchy.children.add(entity);
      }
    }
  }
}
