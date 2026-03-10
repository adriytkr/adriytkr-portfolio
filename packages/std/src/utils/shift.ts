import type { AnimationTrack, Transform } from '../common/components';
import { easeOutQuad } from './animations';
import type { Point } from '../types';

export type updateAnimation=(alpha:number)=>void;

export function shiftAnimation(
  duration:number,
  transform:Transform,
  delta:Point,
):AnimationTrack{
  const startX=transform.localPosition.x;
  const startY=transform.localPosition.y;

  return {
    elapsed:0,
    duration,
    onUpdate(alpha:number){
      const t=easeOutQuad(alpha);

      transform.localPosition.x=startX+delta.x*t;
      transform.localPosition.y=startY+delta.y*t;
    }
  };
}
