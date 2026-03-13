import { Component } from '@adriytkr/engine';

export interface VectorStyleOptions{
  lineStroke:string;
  lineStrokeWidth:number;
  tipStroke:string;
  tipStrokeWidth:number;
  tipFill:string;
}

export class VectorStyle extends Component{
  public lineStroke:string;
  public lineStrokeWidth:number;
  public tipStroke:string;
  public tipStrokeWidth:number;
  public tipFill:string;

  public constructor(options:VectorStyleOptions){
    super();
    this.lineStroke=options.lineStroke;
    this.lineStrokeWidth=options.lineStrokeWidth;
    this.tipStroke=options.tipStroke;
    this.tipStrokeWidth=options.tipStrokeWidth;
    this.tipFill=options.tipFill;
  }
}

export const DEFAULT_VECTOR_STYLE=new VectorStyle({
  lineStroke:'blue',
  lineStrokeWidth:2,
  tipFill:'blue',
  tipStroke:'blue',
  tipStrokeWidth:2,
});
