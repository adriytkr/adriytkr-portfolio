import { BaseAnimation } from './BaseAnimation';
import type { Shiftable } from '@math-objects/interfaces';

import type { AnimationOptions } from '../core';
import { DEFAULT_ANIMATION_OPTIONS } from '@constants/graph';

import type { Point } from '~/shared/types/math/basic';

export class ShiftAnimation extends BaseAnimation{
  private lastAlpha=0;

  constructor(
    private object:Shiftable,
    private delta:Point,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  ){
    super(options);
  }

  public override setup(){
    this.lastAlpha=0;
  }

  public override update(alpha:number){
    const changeInAlpha=alpha-this.lastAlpha;
    const incrementalDelta:Point={
      x:this.delta.x*changeInAlpha,
      y:this.delta.y*changeInAlpha,
    };
    
    this.object.shift(incrementalDelta);
    this.lastAlpha=alpha;
  }

  public override resolve():void{}
}
