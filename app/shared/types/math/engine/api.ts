import type { MathObject } from '~/shared/types/math/math-objects/bases';

export interface AnimationOptions{
  duration:number;
};

export type Animations={};

export interface GraphAPI{
  add:(object:MathObject)=>void;
  remove:(object:MathObject)=>void;
  clear:()=>void;
  animate:Animations,
};
