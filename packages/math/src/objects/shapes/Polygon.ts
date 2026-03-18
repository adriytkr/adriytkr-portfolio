import { Signal } from '@adriytkr/core';
import { GameObject } from '../../GameObject';
import type { ClosedStyleOptions, IVector3 } from '../../types';
import { ClosedStyle } from '../../utils';

export class Polygon extends GameObject{
  public vertices$=new Signal<IVector3[]>([]);

  public style:ClosedStyle;

  public constructor(vertices:IVector3[]=[],style:ClosedStyleOptions){
    super();
    this.vertices$.value=vertices;

    this.style=ClosedStyle.copy(style);
  }

  public getVertex(index:number):IVector3|undefined{
    return this.vertices$.value[index];
  }
}
