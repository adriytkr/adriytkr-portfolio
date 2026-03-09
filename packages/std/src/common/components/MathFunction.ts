import { Component } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

export class MathFunction extends Component{
  public constructor(
    public fn:(x:number)=>number,
    public domain:[number,number],
    public canvasEntity:Entity,
  ){
    super();
  }
}
