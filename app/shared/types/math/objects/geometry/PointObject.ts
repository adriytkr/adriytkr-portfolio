import { MathObject } from '../core/MathObject';
import type { Point,Matrix2x2 } from '~/shared/types/math/basic'; 

export class PointObject extends MathObject implements Shiftable{
  public at:Point;
  public size:number;

  public constructor(at:Point,size:number){
    super();
    this.at=at;
    this.size=size;
  }

  public moveTo(point:Point){
    this.at={...point};
  }

  public shift(delta:Point){
    this.at={
      x:this.at.x+delta.x,
      y:this.at.y+delta.y,
    };
  }

  public applyMatrix(matrix:Matrix2x2){
    this.at={
      x:matrix[0][0]*this.at.x+matrix[0][1]*this.at.y,
      y:matrix[1][0]*this.at.x+matrix[1][1]*this.at.y,
    };
  }
};
