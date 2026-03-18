import { Signal } from '@adriytkr/core';
import { Polygon } from './Polygon';
import type { ClosedStyleOptions, IVector3 } from '../../types';

export interface RegularPolygonOptions{
  radius:number;
  sides:number;
}

export class RegularPolygon extends Polygon{
  public radius$:Signal<number>;
  public sides$:Signal<number>;

  constructor(options:RegularPolygonOptions,style:ClosedStyleOptions){
    super([],style);
    this.radius$=new Signal(options.radius);
    this.sides$=new Signal(options.sides);

    this.updateVertices();
  }

  private updateVertices(){
    const n=Math.max(3,Math.floor(this.sides$.value));
    const r=this.radius$.value;
    const vertices:IVector3[]=[];

    for(let i=0;i<n;i++){
      const theta=(i/n)*Math.PI*2;
      vertices.push({
        x:Math.cos(theta)*r,
        y:Math.sin(theta)*r,
        z:0
      });
    }
    this.vertices$.value=vertices;
  }
}
