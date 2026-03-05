import type { BaseRenderer } from './BaseRenderer';

export class SceneNode<T,TStyle>{
  public id:number;
  public data:T;
  public style:TStyle;
  public renderer:BaseRenderer<T>;

  public constructor(
    id:number,
    data:T,
    style:TStyle,
    renderer:BaseRenderer<T>,
  ){
    this.id=id;
    this.data=data;
    this.style=style;
    this.renderer=renderer;
  }
}
