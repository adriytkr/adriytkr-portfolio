import { MathObject } from '../core/MathObject';
import type { Interval,Point } from '~/shared/types/math/basic';

export class CameraObject extends MathObject{
  public readonly type:MathObjectType='camera';
  public domain:Interval;
  public range:Interval;

  constructor(id:number,domain:Interval,range:Interval){
    super(id);
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
