import { Component } from '@adriytkr/engine';

export type Point={
  x:number,
  y:number,
};

export type DrawCommand=
  {type:'polyline',points:Point[]}|
  {type:'polygon',vertices:Point[]}|
  {type:'line',from:Point,to:Point}|
  {type:'triangle',vertices:[Point,Point,Point]}|
  {type:'circle',center:Point,radius:number};

export class Renderable extends Component{
  public drawCommands:DrawCommand[]=[];

  public constructor(){
    super();
  }

  public addCommand(command:DrawCommand):void{
    this.drawCommands.push(command);
  }

  public clear():void{
    this.drawCommands=[];
  }
}
