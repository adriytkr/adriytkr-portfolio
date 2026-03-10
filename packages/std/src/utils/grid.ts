import { World } from '@adriytkr/engine';
import { Renderable, Transform } from '../common/components';

export interface GridConfig{}

export interface GridStyle{
  color:string,
}

export const DEFAULT_GRID_STYLE:GridStyle={
  color:'red',
};

export function createGrid(
  world:World,
  config:GridConfig,
  style:GridStyle=DEFAULT_GRID_STYLE,
){
  const grid=world.createEntity();
  const transform=world.addComponent(grid,new Transform());

  const renderable=new Renderable();
  const gridSize=10;
  const step=1;

  for(let x=-gridSize; x<=gridSize; x+=step){
    renderable.addDrawCommand({
      type:'polyline',
      points:[
        {x,y:-gridSize,z:0},
        {x,y:gridSize,z:0},
      ],
      style:{
        color:style.color,
      },
    });
  }

  for(let y=-gridSize;y<=gridSize;y+=step){
    renderable.addDrawCommand({
      type:'polyline',
      points:[
        {x:-gridSize,y,z:0},
        {x:gridSize,y,z:0},
      ],
      style:{
        color:style.color,
      },
    });
  }

  renderable.opacity=0.2;
  world.addComponent(grid,renderable);

  return{
    entity:grid,
    transform,
    renderable,
  };
}