import { Component } from '@adriytkr/engine';

export class CircleStyle extends Component{
  public constructor(
    public stroke:string,
    public fill:string,
    public width:number,
  ){
    super();
  }
}
