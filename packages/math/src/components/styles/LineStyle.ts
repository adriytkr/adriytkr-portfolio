import { Component } from '@adriytkr/engine';

export class LineStyle extends Component{
  public constructor(
    public stroke:string,
    public width:number,
  ){
    super();
  }
}
