import { Component } from '@adriytkr/engine';
import type { Point } from '../../types';

export class PolylineGeometry extends Component{
  public constructor(public points:Point[]){
    super();
  }
}
 