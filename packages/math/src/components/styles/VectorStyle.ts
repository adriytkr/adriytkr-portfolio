import { Component } from '@adriytkr/engine';

export class VectorStyle extends Component{
  public constructor(
    public lineColor:string,
    public headColor:string,
  ){
    super();
  }
}
