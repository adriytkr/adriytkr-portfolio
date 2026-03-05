import type { BaseAnimation } from './index';
import type { CameraObject,MathObject,Shiftable } from '@math-objects';

import type { Point,Interval } from '~/shared/types/math/basic';

export interface AnimationOptions{
  duration:number;
};

export type TypeGeneralAnimation<T extends BaseAnimation>=
  (object:MathObject,option?:AnimationOptions)=>T;

export type TypeShiftAnimation<T extends BaseAnimation>=
  (object:Shiftable,delta:Point,option?:AnimationOptions)=>T;

export type TypeCameraTransitionAnimation<T extends BaseAnimation>=(
  camera:CameraObject,
  targetDomain:Interval,
  targetRange:Interval,
  options?:AnimationOptions,
)=>T;
