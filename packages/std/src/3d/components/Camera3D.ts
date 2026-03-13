import { Component } from '@adriytkr/engine';

export interface Camera3DOptions{
  fov:number;
  aspect:number;
}

export class Camera3D extends Component{
  public fov:number;
  public aspect:number;

  public constructor(options:Camera3DOptions){
    super();
    this.fov=options.fov;
    this.aspect=options.aspect;
  }
}
