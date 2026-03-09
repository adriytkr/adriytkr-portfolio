import { Component } from '@adriytkr/engine';

export class PolylineGeometry extends Component{
  public constructor(
    public points:Float32Array,
  ){
    super();
  }
}
