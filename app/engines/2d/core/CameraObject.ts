import type { Interval,Point } from '@math/basic/';

export class CameraObject{
  public domain:Interval;
  public range:Interval;

  constructor(domain:Interval,range:Interval){
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
