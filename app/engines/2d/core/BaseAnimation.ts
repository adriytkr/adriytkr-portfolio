import type { RenderContext } from './core';
import type { AnimationOptions } from './types';

export abstract class BaseAnimation{
  public startTime:number=0;
  public duration:number;

  constructor(options:AnimationOptions){
    this.duration=options.duration;
  }

  abstract setup():void;
  abstract update(alpha:number,context:RenderContext):void;
  abstract resolve():void;
}
