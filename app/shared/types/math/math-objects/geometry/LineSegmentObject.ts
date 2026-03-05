import { SegmentObject } from './SegmentObject';
import type { Point } from '~/shared/types/math/basic';

export class LineSegmentObject extends SegmentObject{
  public override readonly type:MathObjectType='line';
  constructor(id:number,from:Point,to:Point){
    super(id,from,to);
  }
}
