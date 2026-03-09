import { Component } from '@adriytkr/engine';

export class FillStyle extends Component{
  public constructor(
    public stroke:string,
    public fill:string,
    public width:number,
  ){
    super();
  }
}
