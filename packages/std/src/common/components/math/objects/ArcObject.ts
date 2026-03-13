import { Component } from '@adriytkr/engine';

export interface ArcOptions{
  radius:number;
  startAngle:number;
  endAngle:number;
}

export class ArcObject extends Component{
  public radius:number;
  public startAngle:number;
  public endAngle:number;

  public constructor(options:ArcOptions){
    super();
    this.radius=options.radius;
    this.startAngle=options.startAngle;
    this.endAngle=options.endAngle;
  }
}
