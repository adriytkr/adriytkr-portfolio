import { Engine2D } from '../Engine2D';

import {
  FadeInAnimation,
  FadeOutAnimation,
  ShiftAnimation,
  CameraTransitionAnimation
} from '.';

import type { AnimationOptions } from './types';

import type { Interval,Point } from '~/shared/types/math/basic';
import type { CameraObject,MathObject,Shiftable } from '@math-objects';

import { DEFAULT_ANIMATION_OPTIONS } from '@constants/graph';

export class AnimationFactory{
  private m_engine:Engine2D;

  public constructor(engine:Engine2D){
    this.m_engine=engine;
  }

  public fadeIn=(
    object:MathObject,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  )=>new FadeInAnimation(
    object,
    this.m_engine.getObjectStyle(object),
    options,
  );

  public fadeOut=(
    object:MathObject,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  )=>new FadeOutAnimation(
    object,
    this.m_engine.getObjectStyle(object),
    options,
  );

  public shift=(
    object:Shiftable,
    delta:Point,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  )=>new ShiftAnimation(
    object,
    delta,
    options,
  );

  public moveCamera=(
    camera:CameraObject,
    targetDomain:Interval,
    targetRange:Interval,
    options:AnimationOptions=DEFAULT_ANIMATION_OPTIONS,
  )=>new CameraTransitionAnimation(
    camera,
    targetDomain,
    targetRange,
    options,
  );
}
