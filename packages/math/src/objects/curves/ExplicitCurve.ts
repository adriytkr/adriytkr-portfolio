import { ParametricCurve } from './ParametricCurve';
import type { Interval, IVector3, MathFunction, PolylineStyleOptions } from '../../types';

export interface ExplicitCurveOptions{
  y:MathFunction;
  domain:Interval;
  resolution:number;
}

export class ExplicitCurve extends ParametricCurve{
  public y:MathFunction;

  public constructor(options:ExplicitCurveOptions,style:PolylineStyleOptions){
    super(
      {
        domain:options.domain,
        resolution:options.resolution,
      },
      style
    );

    this.y=options.y;
  }

  public getPoint(x:number):IVector3{
    return{
      x,
      y:this.y(x),
      z:0,
    };
  }
}
