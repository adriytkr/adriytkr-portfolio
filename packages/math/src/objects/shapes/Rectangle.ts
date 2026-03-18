import { Signal } from '~~/packages/core/src';
import { Polygon } from './Polygon';
import type { ClosedStyleOptions } from '../../types';

export interface RectangleOptions{
  width:number;
  height:number;
}

export class Rectangle extends Polygon{
  public width$:Signal<number>;
  public height$:Signal<number>;

  public constructor(options:RectangleOptions,style:ClosedStyleOptions){
    super([],style);
    this.width$=new Signal(options.width);
    this.height$=new Signal(options.height);

    this.width$.subscribe(()=>this.updateVertices());
    this.height$.subscribe(()=>this.updateVertices());
    
    this.updateVertices();
  }

  private updateVertices(){
    const w=this.width$.value/2;
    const h=this.height$.value/2;

    this.vertices$.value=[
      {x:-w,y:h,z:0},
      {x:w,y:h,z:0},
      {x:w,y:-h,z:0},
      {x:-w,y:-h,z:0},
    ];
  }
}
