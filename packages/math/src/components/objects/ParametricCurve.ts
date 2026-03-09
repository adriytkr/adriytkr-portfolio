import { Component } from '@adriytkr/engine';

export class ParametricCurve extends Component{
  public constructor(
    public x:(t:number)=>number,
    public y:(t:number)=>number,
    public tDomain:[number,number],
  ){
    super();
  }
}
