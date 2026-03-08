import { Component } from '@adriytkr/engine';

export class Velocity extends Component{
  public constructor(
    public x:number,
    public y:number=0,
    public z:number=0,
  ){
    super();
  }
}
