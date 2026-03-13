import { Component } from '@adriytkr/engine';

export interface FunctionOptions{
  fn:(x:number)=>number;
  samples:number;
  domain:[number,number];
}

export class FunctionObject extends Component{
  public fn:(x:number)=>number;
  public samples:number;
  public domain:[number,number];

  public constructor(options:FunctionOptions){
    super();
    this.fn=options.fn;
    this.samples=options.samples;
    this.domain=options.domain;
  }
}
