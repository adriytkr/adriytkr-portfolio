import type { Growable } from "~/shared/types/math/math-objects/interfaces";

export type MathObjectType=
  'point'|
  'vector'|
  'function'|
  'line'|
  'camera';

export abstract class MathObject{
  public id:number;
  abstract readonly type:MathObjectType;
  constructor(id:number){
    this.id=id;
  }
}

export abstract class SegmentObject extends MathObject implements Growable{
  public from:Point;
  public to:Point;
  constructor(id:number,from:Point,to:Point){
    super(id);
    this.from=from;
    this.to=to;
  }
  public get length():number{
    return Math.sqrt(
      (this.from.y-this.to.y)**2+
      (this.from.x-this.to.x)**2
    );
  }
}
