import { World } from '@adriytkr/engine';
import type { Point } from '../types';
import { Renderable, Transform } from '../common/components';

export interface PolygonConfig{
  position:Point,
  vertices:Point[],
}

export interface PolygonStyle{
  stroke:string;
  fill:string;
}

export const DEFAULT_POLYGON_STYLE:PolygonStyle={
  stroke:'red',
  fill:'white',
};

export function createPolygon(
  world:World,
  config:PolygonConfig,
  style:PolygonStyle=DEFAULT_POLYGON_STYLE,
){
  const {position,vertices}=config;

  const square=world.createEntity();

  const transform=world.addComponent(square,new Transform());
  transform.localPosition={...position};

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'polygon',
    vertices:vertices.map(vertex=>({
      x:position.x+vertex.x,
      y:position.y+vertex.y,
      z:position.z+vertex.z,
    })),
    style:{
      stroke:style.stroke,
      fill:style.fill,
    },
  });
  world.addComponent(square,renderable);

  return{
    entity:square,
    transform,
    renderable,
  };
}


