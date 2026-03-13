import { Component } from '@adriytkr/engine';

export interface RegularPolygonOptions{
  sides:number;
  sidelength:number;
  offsetAngle?:number;
}

export class RegularPolygonObject extends Component{
  public sides:number;
  public sidelength:number;
  public offsetAngle?:number;

  public constructor(options:RegularPolygonOptions){
    super();
    this.sides=options.sides;
    this.sidelength=options.sidelength;
    this.offsetAngle=options.offsetAngle;
  }
}
