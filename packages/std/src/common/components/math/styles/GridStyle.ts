import { Component } from '@adriytkr/engine';

export interface GridStyleOptions{
  stroke:string;
  strokeWidth:number;
}

export class GridStyle extends Component{
  public stroke:string;
  public strokeWidth:number;

  public constructor(options:GridStyleOptions){
    super();
    this.stroke=options.stroke;
    this.strokeWidth=options.strokeWidth;
  }
}

export const DEFAULT_GRID_STYLE=new GridStyle({
  stroke:'red',
  strokeWidth:2,
});
