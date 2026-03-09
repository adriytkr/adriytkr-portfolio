import { Component } from '@adriytkr/engine';

export class Vector extends Component{
  public constructor(
    public toX:number,
    public toY:number,
  ){
    super();
  }
}
