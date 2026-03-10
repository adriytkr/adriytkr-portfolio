import { World } from '@adriytkr/engine';
import type { Point } from '../types';
import { Renderable, Transform } from '../common/components';

export interface CircleConfig{
  position:Point,
  sideLength:number,
}

export interface CircleStyle{
  stroke:string,
  fill:string,
}

export const DEFAULT_CIRCLE_STYLE:CircleStyle={
  stroke:'red',
  fill:'white',
};

export function createCircle(
  world:World,
  config:CircleConfig,
  style:CircleStyle=DEFAULT_CIRCLE_STYLE,
){
  const {position,sideLength}=config;

  const pentagon=world.createEntity();

  const transform=world.addComponent(pentagon,new Transform());
  transform.localPosition={...position};

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'polygon',
    vertices:[],
    style:{
      stroke:style.stroke,
      fill:style.fill,
    },
  });

  return{
    entity:pentagon,
    transform,
    renderable,
  };
}

