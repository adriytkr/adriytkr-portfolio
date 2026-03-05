import { SegmentObject } from './SegmentObject';
import type { Point } from '~/shared/types/math/basic'; 

export class VectorObject extends SegmentObject implements Shiftable{
  constructor(from:Point,to:Point){
    super(from,to);
  }

  public shift(delta:Point){
    this.from={
      x:this.from.x+delta.x,
      y:this.from.y+delta.y,
    };
    this.to={
      x:this.to.x+delta.x,
      y:this.to.y+delta.y,
    };
  }
};
