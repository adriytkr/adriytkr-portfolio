import { Component } from '@adriytkr/engine';

export type AnimationTrack={
  duration:number;
  elapsed:number;
  onUpdate(alpha:number):void;
};

export class AnimationGroup extends Component{
  public tracks:AnimationTrack[]=[];

  public constructor(){
    super();
  }

  public addTrack(track:AnimationTrack):void{
    this.tracks.push(track);
  }
}
