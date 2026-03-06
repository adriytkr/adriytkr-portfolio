import type { Interval,Point } from '@math/basic/';

export interface AxisData{
  origin:Point;
  vector:Point;
  unitLength:number;
  tickSize:number;
  labelOffset:number;
  domain?:Interval;
}
