import { BaseAnimation } from './BaseAnimation';
import type { MathObject } from '@math-objects';
import type { ObjectStyle } from '../core';

import type { AnimationOptions } from '../core';
import { DEFAULT_ANIMATION_OPTIONS } from '@constants/graph';

export class FadeOutAnimation extends BaseAnimation{
  private style:ObjectStyle;

  constructor(
    object: MathObject,
    style:ObjectStyle,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  ){
    super(options);
    this.style=style;
  }

  override setup(){
    this.style.opacity=0;
  }

  override update(alpha:number){
    this.style.opacity=1-alpha;
  }

  override resolve():void{}
}

