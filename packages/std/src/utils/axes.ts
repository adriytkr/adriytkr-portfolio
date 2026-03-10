import { World } from '@adriytkr/engine';
import { Renderable, Transform } from '../common/components';

export interface AxesConfig{}

export interface AxesStyle{
  color:string,
}

export const DEFAULT_AXES_STYLE:AxesStyle={
  color:'red',
};

export function createStandardAxes(
  world:World,
  config:AxesConfig,
  style:AxesStyle=DEFAULT_AXES_STYLE,
){
  const axes=world.createEntity();
  const transform=world.addComponent(axes,new Transform());

  const renderable=new Renderable();

  renderable.addDrawCommand({
    type:'polyline',
    points:[
      {x:-10,y:0,z:0},
      {x:10,y:0,z:0},
    ],
    style:{
      color:style.color,
    },
  });

  renderable.addDrawCommand({
    type:'polyline',
    points:[
      {x:0,y:-10,z:0},
      {x:0,y:10,z:0},
    ],
    style:{
      color:style.color,
    },
  });

  world.addComponent(axes,renderable);

  return{
    entity:axes,
    transform,
    renderable,
  };
}
