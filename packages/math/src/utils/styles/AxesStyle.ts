import { Signal } from '@adriytkr/core';
import type { AxesStyleOptions } from '../../types';

export class AxesStyle{
  public color$:Signal<string>;
  public opacity$:Signal<number>;

  public constructor(options:AxesStyleOptions){
    this.color$=new Signal(options.color);
    this.opacity$=new Signal(options.opacity);
  }

  public static copy(style:AxesStyleOptions):AxesStyle{
    return new AxesStyle({
      color:style.color,
      opacity:style.opacity,
    });
  }
}
