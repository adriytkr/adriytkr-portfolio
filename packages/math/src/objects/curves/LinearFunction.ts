import { Signal } from '@adriytkr/core';

import { ParametricCurve } from './ParametricCurve';
import type { Interval, IVector3, MathFunction, PolylineStyleOptions } from '../../types';

export interface LinearFunctionOptions{
  slope:number;
  yIntercept:number;
  domain:Interval;
}

export class LinearFunction extends ParametricCurve{
  public y:MathFunction;
  public slope$:Signal<number>;
  public yIntercept$:Signal<number>;

  public constructor(options:LinearFunctionOptions,style:PolylineStyleOptions){
    super(
      {
        domain:options.domain,
        resolution:2,
      },
      style,
    );

    this.slope$=new Signal(options.slope);
    this.yIntercept$=new Signal(options.yIntercept);
    this.y=x=>this.slope$.value*x+this.yIntercept$.value;
  }

  public getPoint(x:number):IVector3{
    return{
      x,
      y:this.y(x),
      z:0,
    };
  }
}

