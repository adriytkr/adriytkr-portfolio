import { BaseAnimation } from '~/shared/types/math/engine/animations/BaseAnimation';
import type { MathObject } from '~/shared/types/math/math-objects/bases';
import type { ObjectStyle } from '~/shared/types/math/engine/api';

export class FadeInAnimation extends BaseAnimation{
  private style:ObjectStyle;

  constructor(
    object: MathObject,
    style:ObjectStyle,
    options:AnimationOptions,
  ){
    super(options);
    this.style=style;
  }

  override setup(){
    this.style.opacity=0;
  }

  override update(alpha:number){
    this.style.opacity=alpha;
  }

  override resolve():void{}
}
