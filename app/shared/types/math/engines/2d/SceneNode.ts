import type { MathObject } from '@math-objects';
import type { NodeStyle } from './core';
import type { BaseRenderer } from './renderers';

export class SceneNode<T extends MathObject>{
  public id:number;
  public data:T;
  public style:NodeStyle;
  public renderer:BaseRenderer<MathObject>;

  public constructor(
    id:number,
    data:T,
    style:NodeStyle,
    renderer:BaseRenderer<MathObject>,
  ){
    this.id=id;
    this.data=data;
    this.style=style;
    this.renderer=renderer;
  }
}
