import { World } from '@adriytkr/engine';
import type { Point } from '../types';
import { Renderable, Transform } from '../common/components';

export interface PolylineConfig{
  position:Point,
  sideLength:number,
}

export interface PolylineStyle{
  stroke:string,
  fill:string,
}

export const DEFAULT_POLYLINE_STYLE:PolylineStyle={
  stroke:'red',
  fill:'white',
};

export function createPolyline(
  world:World,
  config:PolylineConfig,
  style:PolylineStyle=DEFAULT_POLYLINE_STYLE,
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

