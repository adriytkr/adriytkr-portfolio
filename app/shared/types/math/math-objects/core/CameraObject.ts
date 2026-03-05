import { MathObject } from '../core/MathObject';
import type { Interval,Point } from '~/shared/types/math/basic';

export class CameraObject extends MathObject{
  public domain:Interval;
  public range:Interval;

  constructor(domain:Interval,range:Interval){
    super();
    this.domain=domain;
    this.range=range;
  }

  public shift(delta:Point){
    this.domain=[
      this.domain[0]+delta.x,
      this.domain[1]+delta.y,
    ];
    this.range=[
      this.range[0]+delta.x,
      this.range[1]+delta.y,
    ];
  }
}
