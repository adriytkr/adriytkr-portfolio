import type { Point } from '../../types';
import type { Transform } from '../components';

export interface DrawCommand<T,G,S>{
  topology:T,
  geometry:G,
  style:S,
  transform:Transform,
};

export type PolylineTopology='polyline';
export type PolylineGeometry={
  points:Point[];
};
export type PolylineStyle={
  stroke:string;
  strokeWidth:string;
};
export type PolylineDrawCommand=DrawCommand<PolylineTopology,PolylineGeometry,PolylineStyle>;

export class CommandBuffer<T extends DrawCommand<any,any,any>>{
  public commands:T[]=[];
  
  public push(cmd:T):void{
    this.commands.push(cmd);
  }

  public clear():void{
    this.commands.length=0;
  }
}
