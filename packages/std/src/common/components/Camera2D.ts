import { Component } from '@adriytkr/engine';

export class Camera2D extends Component{
  public constructor(
    public x:number,
    public y:number,
    public width:number,
    public height:number,
  ){
    super();
  }
}
