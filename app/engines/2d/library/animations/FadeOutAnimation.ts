import type { AnimationOptions } from '~/engines/shared/core/types';
import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { HasOpacity } from './types';
import { BaseAnimation2D } from '@engines/2d/core/BaseAnimation2D';
import type { SceneNode2D } from '@engines/2d/core/SceneNode2D';

export class FadeOutAnimation<T> extends BaseAnimation2D{
  private m_node:SceneNode2D<T,HasOpacity>;

  constructor(
    node: SceneNode2D<T,HasOpacity>,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  ){
    super(options);
    this.m_node=node;
  }

  override setup(){
    this.m_node.style.opacity=1;
  }

  override update(alpha:number){
    this.m_node.style.opacity=1-alpha;
  }

  override resolve():void{}
}

