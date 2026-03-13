import { Component } from '@adriytkr/engine';

export interface FunctionStyleOptions{
  stroke:string;
  strokeWidth:number;
}

export class FunctionStyle extends Component{
  public stroke:string;
  public strokeWidth:number;

  public constructor(options:FunctionStyleOptions){
    super();
    this.stroke=options.stroke;
    this.strokeWidth=options.strokeWidth;
  }
}

export const DEFAULT_FUNCTION_STYLE:FunctionStyle=new FunctionStyle({
  stroke:'red',
  strokeWidth:2,
});
