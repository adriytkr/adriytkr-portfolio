import { Signal } from '@adriytkr/core';
import { GameObject } from '../../GameObject';
import type { Interval, IVector3, PolylineStyleOptions } from '../../types';
import { PolylineStyle } from '../../utils';

export interface ParametricCurveOptions{
  domain:Interval;
  resolution:number;
}

export abstract class ParametricCurve extends GameObject{
  public tMin$:Signal<number>;
  public tMax$:Signal<number>;

  public style:PolylineStyle;
  public resolution:number;

  public constructor(options:ParametricCurveOptions,style:PolylineStyleOptions){
    super();
    this.tMin$=new Signal(options.domain[0])
    this.tMax$=new Signal(options.domain[1]);
    this.resolution=options.resolution;

    this.style=PolylineStyle.copy(style);
  }

  public abstract getPoint(t:number):IVector3;
}
