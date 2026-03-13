import { Component } from '@adriytkr/engine';
import type { Point } from '../../../../types';

export interface VectorOptions{
  to:Point;
}

export class VectorObject extends Component{
  public to:Point;

  public constructor(options:VectorOptions){
    super();
    this.to=options.to;
  }
}
