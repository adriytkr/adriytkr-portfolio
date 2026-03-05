import { BaseAnimation } from '@engines/2d/core/BaseAnimation';
import type { AnimationOptions } from '@engines/2d/core/types';
import type { SceneNode } from '@engines/2d/core/SceneNode';
import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { HasOpacity } from './types';

export class FadeInAnimation<T> extends BaseAnimation{
  private m_node:SceneNode<T,HasOpacity>;

  constructor(
    node:SceneNode<T,HasOpacity>,
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
