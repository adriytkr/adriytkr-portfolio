import type { MathObject } from '~/shared/types/math/math-objects/bases';
import type { BaseAnimation } from '~/shared/types/math/engine/animations/BaseAnimation';
import type { ShiftAnimation } from '~/shared/types/math/engine/animations/ShiftAnimation';

export interface ObjectStyle{
  opacity:number;
};

export interface AnimationOptions{
  duration:number;
};

export type GetObjectStyle=(object:MathObject)=>ObjectStyle;

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

export interface Animations{
  fadeIn:TypeGeneralAnimation<FadeInAnimation>;
  fadeOut:TypeGeneralAnimation<FadeOutAnimation>;
  shift:TypeShiftAnimation<ShiftAnimation>;
  moveCamera:TypeCameraTransitionAnimation<CameraTransition>;
};

export interface GraphAPI{
  add:(object:MathObject)=>void;
  remove:(object:MathObject)=>void;
  clear:()=>void;
  play:(...animations:BaseAnimation[])=>Promise<void[]>;
  setActiveCamera:(camera:CameraObject)=>void;
  animate:Animations;
};
