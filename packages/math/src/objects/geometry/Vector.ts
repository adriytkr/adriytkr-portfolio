import { Signal } from '@adriytkr/core';
import { GameObject } from '../../GameObject';
import type { IVector3, VectorStyleOptions } from '../../types';
import { VectorStyle } from '../../utils';

export interface VectorOptions{
  to:IVector3,
}

export class Vector extends GameObject{
  public to$:Signal<IVector3>;

  public style:VectorStyle;

  public constructor(options:VectorOptions,style:VectorStyleOptions){
    super();

    this.to$=new Signal({
      x:options.to.x,
      y:options.to.y,
      z:options.to.z,
    });

    this.style=VectorStyle.copy(style);
  }
}
