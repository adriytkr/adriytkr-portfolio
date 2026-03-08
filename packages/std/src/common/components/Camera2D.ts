import { Component } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

export class Camera2D extends Component{
  public domain:[number,number]=[-3,3];
  public range:[number,number]=[-3,3];

  public graphEntityId:Entity|null=null;

  public constructor(
    graphEntityId:number,
  ){
    super();
    this.graphEntityId=graphEntityId;
  }
}
