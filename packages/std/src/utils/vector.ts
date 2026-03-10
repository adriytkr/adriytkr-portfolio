import { World } from '@adriytkr/engine';
import type { Point } from '../types';
import { Renderable, Transform } from '../common/components';

export interface VectorConfig{
  from:Point,
  to:Point,
}

export interface VectorStyle{
  color:string,
}

export const DEFAULT_VECTOR_STYLE:VectorStyle={
  color:'red',
};

export function createVector(
  world:World,
  config:VectorConfig,
  style:VectorStyle=DEFAULT_VECTOR_STYLE,
){
  const {from,to}=config;

  const vector=world.createEntity();

  const transform=world.addComponent(vector,new Transform());
  transform.localPosition={...from};

  const renderable=new Renderable();
  renderable.addDrawCommand({
    type:'polyline',
    points:[from,to],
    style:{
      color:style.color,
    },
  });

  const size=0.3;

  const dx=to.x-from.x;
  const dy=to.y-from.y;
  const length=Math.sqrt(dx**2+dy**2);
  const ux=dx/length;
  const uy=dy/length;
  const px=-uy*size;
  const py=ux*size;
  const base1={x:to.x-ux*size+px,y:to.y-uy*size+py,z:0};
  const base2={x:to.x-ux*size-px,y:to.y-uy*size-py,z:0};
  renderable.addDrawCommand({
    type:'polygon',
    vertices:[to,base1,base2],
    style:{
      stroke:style.color,
      fill:style.color,
    },
  });
  world.addComponent(vector,renderable);

  return{
    entity:vector,
    transform,
    renderable,
  };
}
