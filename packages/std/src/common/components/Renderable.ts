import { Component } from '@adriytkr/engine';

import type { Point } from '../../types';
import type { DrawCommand } from '../systems/CommandBuffer';

// export type PolylineCommand={
//   type:'polyline';
//   points:Point[];
//   style:{color:string};
// };

// export type PolygonCommand={
//   type:'polygon';
//   vertices:Point[];
//   style:{stroke:string,fill:string};
// };

// export type ArcCommand={
//   type:'arc';
//   radius:number;
//   startAngle:number;
//   endAngle:number;
//   style:{stroke:string,fill:string};
// };

// export type DrawCommand=
//   PolylineCommand|
//   PolygonCommand|
//   ArcCommand;

// export class Renderable extends Component{
//   public drawCommands:DrawCommand[]=[];
//   public opacity:number=1;

//   public constructor(){
//     super();
//   }

//   public addDrawCommand(command:DrawCommand):void{
//     this.drawCommands.push(command);
//   }

//   public clear():void{
//     this.drawCommands=[];
//   }
// }

export class Renderable{
  public primitives:DrawCommand<any,any,any>[]=[];
}
