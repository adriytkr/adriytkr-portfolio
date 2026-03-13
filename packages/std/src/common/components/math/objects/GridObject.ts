import { Component } from '@adriytkr/engine';

export interface GridOptions{
  xMin:number;
  xMax:number;
  yMin:number;
  yMax:number;
  xStep:number;
  yStep:number;
}

export class GridObject extends Component{
  public xMin:number;
  public xMax:number;
  public yMin:number;
  public yMax:number;
  public xStep:number;
  public yStep:number;
 
  public constructor(options:GridOptions){
    super();
    this.xMin=options.xMin;
    this.xMax=options.xMax;
    this.yMin=options.yMin;
    this.yMax=options.yMax;
    this.xStep=options.xStep;
    this.yStep=options.yStep;
  }
}
