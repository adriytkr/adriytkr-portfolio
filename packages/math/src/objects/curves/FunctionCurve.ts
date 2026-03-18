import { ParametricCurve } from './ParametricCurve';
import type { Interval, IVector3, MathFunction, PolylineStyleOptions } from '../../types';

export interface FunctionCurveOptions{
  x:MathFunction;
  y:MathFunction;
  z:MathFunction;
  tDomain:Interval;
  resolution:number;
}

export class FunctionCurve extends ParametricCurve{
  public x:MathFunction;
  public y:MathFunction;
  public z:MathFunction;

  public constructor(options:FunctionCurveOptions,style:PolylineStyleOptions){
    super(
      {
        domain:options.tDomain,
        resolution:options.resolution,
      },
      style,
    );

    this.x=options.x;
    this.y=options.y;
    this.z=options.z;
  }

  public getPoint(t:number):IVector3{
    return{
      x:this.x(t),
      y:this.y(t),
      z:this.z(t),
    };
  }
}
