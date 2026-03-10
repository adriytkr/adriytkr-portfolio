import { World } from '@adriytkr/engine';
import type { Point } from '../types';
import { Renderable, Transform } from '../common/components';
import { createRegularPolygonVertices } from './helpers';

export interface PentagonConfig{
  position:Point,
  sideLength:number,
}

export interface PentagonStyle{
  stroke:string,
  fill:string,
}

export const DEFAULT_PENTAGON_STYLE:PentagonStyle={
  stroke:'red',
  fill:'white',
};

export function createPentagon(
  world:World,
  config:PentagonConfig,
  style:PentagonStyle=DEFAULT_PENTAGON_STYLE,
){
  const {position,sideLength}=config;

  const pentagon=world.createEntity();

  const transform=world.addComponent(pentagon,new Transform());
  transform.localPosition={...position};

  const radius=sideLength/(2*Math.sin(Math.PI/5));
  const vertices=createRegularPolygonVertices(5,radius)

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'polygon',
    vertices,
    style:{
      stroke:style.stroke,
      fill:style.fill,
    },
  });
  world.addComponent(pentagon,renderable);

  return{
    entity:pentagon,
    transform,
    renderable,
  };
}
