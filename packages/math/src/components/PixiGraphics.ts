import { Component } from '@adriytkr/engine';

import * as PIXI from 'pixi.js';

export class PixiGraphics extends Component{
  public constructor(
    public graphics:PIXI.Graphics,
  ){
    super();
  }
}
