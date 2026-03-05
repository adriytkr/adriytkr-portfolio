import { SegmentObject } from './SegmentObject';
import type { Point } from '~/shared/types/math/basic';

export class LineSegmentObject extends SegmentObject{
  constructor(from:Point,to:Point){
    super(from,to);
  }
}
