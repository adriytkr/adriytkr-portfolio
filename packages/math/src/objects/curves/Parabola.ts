import { Signal } from '@adriytkr/core';

import { ParametricCurve } from './ParametricCurve';
import type { Interval, IVector3, MathFunction, PolylineStyleOptions } from '../../types';

import { PolylineStyle } from '../../utils';

export interface ParabolaOptions{
  a:number;
  b:number;
  c:number;
  domain:Interval;
  resolution:number;
}

export class Parabola extends ParametricCurve{
  public y:MathFunction;
  public a$:Signal<number>;
  public b$:Signal<number>;
  public c$:Signal<number>;

  public constructor(options:ParabolaOptions,style:PolylineStyleOptions){
    super(
      {
        domain:options.domain,
        resolution:options.resolution,
      },
      style,
    );

    this.a$=new Signal(options.a);
    this.b$=new Signal(options.b);
    this.c$=new Signal(options.c);
    this.y=x=>this.a$.value*x**2+this.b$.value*x+this.c$.value;
  }

  public getPoint(x:number):IVector3{
    return{
      x,
      y:this.y(x),
      z:0,
    };
  }
}


