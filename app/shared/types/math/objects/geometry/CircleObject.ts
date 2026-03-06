import { MathObject } from '../core/MathObject';

export class CircleObject extends MathObject{
  public radius;
  public center:Point;

  public constructor(center:Point,radius:number){
    super();
    this.center=center;
    this.radius=radius;
  }
}
