import { World } from '@adriytkr/engine';
import { Renderable,Transform } from '../common/components';

import type { Point } from '../types';

export interface FuncConfig{
  fn:(x:number)=>number,
  domain:[number,number],
  samples:number,
}

export interface FuncStyle{
  color:string,
}

export const DEFAULT_FUNC_STYLE:FuncStyle={
  color:'red',
};

export function createFunc(
  world:World,
  config:FuncConfig,
  style:FuncStyle=DEFAULT_FUNC_STYLE,
){
  const {fn,domain,samples}=config;

  const func=world.createEntity();
  const transform=world.addComponent(func,new Transform());
  const renderable=world.addComponent(func,new Renderable());

  const points:Point[]=[];

  const dx=(domain[1]-domain[0])/samples;
  for(let x=domain[0];x<=domain[1];x+=dx){
    points.push({x,y:fn(x),z:0});
  }

  renderable.addDrawCommand({
    type:'polyline',
    points,
    style:{
      color:style.color,
    },
  });

  return{
    entity:func,
    transform,
    renderable,
  };
}
