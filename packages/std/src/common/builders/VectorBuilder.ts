import type { ComponentType,Entity,World } from '@adriytkr/engine';
import type { GeometryBuilder } from './GeometryBuilder';
import { Transform } from '../components';

export class VectorBuilder implements GeometryBuilder{
  public components:ComponentType<any>[]=[Transform,VectorObject];

  public build(entity:Entity,world:World):void{
    // world.addComponent(entity,new Po);
  }
}
