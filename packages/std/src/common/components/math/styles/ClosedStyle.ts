import { Component } from '@adriytkr/engine';

export interface ClosedStyleOptions{
  stroke:string;
  strokeWidth:number;
  fill:string;
}

export class ClosedStyle extends Component{
  public stroke:string;
  public strokeWidth:number;
  public fill:string;

  public constructor(options:ClosedStyleOptions){
    super();
    this.stroke=options.stroke;
    this.strokeWidth=options.strokeWidth;
    this.fill=options.fill;
  }
}

export const DEFAULT_CLOSED_STYLE:ClosedStyle=new ClosedStyle({
  fill:'white',
  stroke:'red',
  strokeWidth:1,
});
