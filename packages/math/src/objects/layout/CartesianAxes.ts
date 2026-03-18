import { Signal } from '@adriytkr/core';
import { GameObject } from '../../GameObject';
import type { AxesStyleOptions, Interval } from '../../types';
import { AxesStyle } from '../../utils';

export interface CartesianAxesOptions{
  domain:Interval;
  range:Interval;
  step:number;
}

export class CartesianAxes extends GameObject{
  public domain$:Signal<Interval>;
  public range$:Signal<Interval>;
  public step$=new Signal(1);

  public style:AxesStyle;

  constructor(options:CartesianAxesOptions,style:AxesStyleOptions){
    super();
    this.domain$=new Signal(options.domain);
    this.range$=new Signal(options.range);

    this.style=AxesStyle.copy(style);
  }
}
