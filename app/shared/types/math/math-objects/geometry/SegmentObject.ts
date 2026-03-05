import { MathObject } from '../core/MathObject';
import type { Point } from '~/shared/types/math/basic'; 
import type { Growable } from '../interfaces';

export abstract class SegmentObject extends MathObject implements Growable{
  public from:Point;
  public to:Point;

  constructor(from:Point,to:Point){
    super();
    this.from=from;
    this.to=to;
  }

  public get length():number{
    return Math.sqrt(
      (this.from.y-this.to.y)**2+
      (this.from.x-this.to.x)**2
    );
  }
}
