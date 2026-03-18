import { Signal } from '@adriytkr/core';
import { GameObject } from '../../GameObject';
import { ClosedStyle } from '../../utils';
import type { ClosedStyleOptions } from '../../types';

export interface PointOptions{
  size:number;
}

export class Point extends GameObject{
  public size$:Signal<number>;
  public style:ClosedStyle;

  public constructor(options:PointOptions,style:ClosedStyleOptions){
    super();
    this.size$=new Signal(options.size);

    this.style=ClosedStyle.copy(style);
  }
}
