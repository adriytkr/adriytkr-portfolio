import type { ComponentType,World,Entity } from '@adriytkr/engine';

export interface GeometryBuilder{
  components:ComponentType<any>[];
  build(entity:Entity,world:World):void;
}
