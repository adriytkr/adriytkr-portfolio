import { Component } from '@adriytkr/engine';

import type { Point } from '../../types';

export type PolylineCommand={
  type:'polyline';
  points:Point[];
  style:{color:string};
};

export type PolyconCommand={
  type:'polygon';
  vertices:Point[];
  style:{stroke:string,fill:string};
};

export type DrawCommand=
  PolylineCommand|
  PolyconCommand;

export class Renderable extends Component{
  public drawCommands:DrawCommand[]=[];
  public opacity:number=1;

  public constructor(){
    super();
  }

  public addDrawCommand(command:DrawCommand):void{
    this.drawCommands.push(command);
  }

  public clear():void{
    this.drawCommands=[];
  }
}
