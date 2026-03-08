import { Component } from '@adriytkr/engine';
import * as PIXI from 'pixi.js';

export class PixiRenderable extends Component{
  public constructor(
    public graphics:PIXI.Container,
    public update:(graphics:PIXI.Container)=>void,
  ){
    super();
  }
}
