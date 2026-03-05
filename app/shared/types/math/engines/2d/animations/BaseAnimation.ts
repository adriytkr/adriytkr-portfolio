import { DEFAULT_ANIMATION_OPTIONS } from '@constants/graph';

export abstract class BaseAnimation{
  public startTime:number=0;
  public duration:number;

  constructor(options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS){
    this.duration=options.duration;
  }

  abstract setup():void;
  abstract update(alpha: number):void;
  abstract resolve():void;
}
