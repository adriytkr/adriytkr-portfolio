import { World } from '@adriytkr/engine';
import type { Point } from '../types';
import { Renderable, Transform } from '../common/components';

export interface LineConfig{
  position:Point,
  sideLength:number,
}

export interface LineStyle{
  stroke:string,
  fill:string,
}

export const DEFAULT_LINE_STYLE:LineStyle={
  stroke:'red',
  fill:'white',
};

export function createLine(
  world:World,
  config:LineConfig,
  style:LineStyle=DEFAULT_LINE_STYLE,
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

