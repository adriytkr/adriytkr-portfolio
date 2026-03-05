import { BaseAnimation } from './BaseAnimation';
import type { MathObject } from '@math-objects';

import type { AnimationOptions } from './types';
import { DEFAULT_ANIMATION_OPTIONS } from '@constants/graph';

export class FadeInAnimation extends BaseAnimation{
  private m_node:SceneNode<MathObject>;

  constructor(
    node: SceneNode<MathObject>,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  ){
    super(options);
    this.m_node=node;
  }

  override setup(){
    this.m_node.style.opacity=0;
  }

  override update(alpha:number){
    this.m_node.style.opacity=alpha;
  }

  override resolve():void{}
}
