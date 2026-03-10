import { World } from '@adriytkr/engine';
import type { Point } from '../types';
import { Camera2D } from '../2d';

export function create2DCamera(
  world:World,
  config:{
    position:Point,
    zoom:number,
    size:{
      width:number,
      height:number,
    },
  },
  style?:{},
){
  const {position,zoom,size}=config;

  const camera=world.createEntity();

  const camera2D=world.addComponent(
    camera,
    new Camera2D(
      position.x,
      position.y,
      zoom,
      size.width,
      size.height,
    ),
  );

  return{
    entity:camera,
    camera2D,
  };
}