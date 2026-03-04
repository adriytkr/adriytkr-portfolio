import type { AnimationOptions } from '~/shared/types/math/engine/api';
import { FadeInAnimation } from '~/shared/types/math/engine/animations/FadeInAnimation';
import { FadeOutAnimation } from '~/shared/types/math/engine/animations/FadeOutAnimation';
import { ShiftAnimation } from '~/shared/types/math/engine/animations/ShiftAnimation';
import type { MathObject } from '~/shared/types/math/math-objects/bases';

import {DEFAULT_ANIMATION_OPTIONS} from '~/shared/constants/graph';

export class AnimationFactory{
  private m_engine:Engine;

  public constructor(engine:Engine){
    this.m_engine=engine;
  }

  public fadeIn=(object:MathObject,options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS)=>{
    const style=this.m_engine.getObjectStyle(object);
    return new FadeInAnimation(object,style,options);
  }

  public fadeOut=(object:MathObject,options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS)=>{
    const style=this.m_engine.getObjectStyle(object);
    return new FadeOutAnimation(object,style,options);
  }

  public shift=(object:Shiftable,delta:Point,options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS)=>
    new ShiftAnimation(object,delta,options);

  public moveCamera=(
    camera:CameraObject,
    targetDomain:Interval,
    targetRange:Interval,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS
  )=>new CameraTransition(camera,targetDomain,targetRange,options);
}
