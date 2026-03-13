import { Component } from '@adriytkr/engine';

export interface ParametricFunctionOptions{
  x:MathFunction;
  y:MathFunction;
  tDomain:Interval;
  samples:number;
}

export class ParametricFunctionObject extends Component{
  public x:MathFunction;
  public y:MathFunction;
  public tDomain:Interval;
  public samples:number;

  public constructor(options:ParametricFunctionOptions){
    super();
    this.x=options.x;
    this.y=options.y;
    this.tDomain=options.tDomain;
    this.samples=options.samples;
  }
}
