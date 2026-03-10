import { World } from '@adriytkr/engine';
import type { Point } from '../types';
import { Renderable, Transform } from '../common/components';

export interface SquareConfig{
  position:Point,
  size:number,
}

export interface SquareStyle{
  stroke:string;
  fill:string;
}

export const DEFAULT_SQUARE_STYLE:SquareStyle={
  stroke:'red',
  fill:'white',
};

export function createSquare(
  world:World,
  config:SquareConfig,
  style:SquareStyle=DEFAULT_SQUARE_STYLE,
){
  const {position,size}=config;

  const square=world.createEntity();

  const transform=world.addComponent(square,new Transform());
  transform.localPosition={...position};

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'polygon',
    vertices:[
      {x:position.x,y:position.y,z:0},
      {x:position.x,y:position.y+size,z:0},
      {x:position.x+size,y:position.y+size,z:0},
      {x:position.x+size,y:position.y,z:0},
    ],
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
