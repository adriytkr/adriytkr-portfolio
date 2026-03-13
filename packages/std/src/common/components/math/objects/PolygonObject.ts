import { Component } from '@adriytkr/engine';
import type { Point } from '../../../../types';

export interface PolygonOptions{
  vertices:Point[];
}

export class PolygonObject extends Component{
  public vertices:Point[];

  public constructor(options:PolygonOptions){
    super();
    this.vertices=options.vertices;
  }
}
