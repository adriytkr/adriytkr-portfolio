import type {
  FadeInAnimation,
  FadeOutAnimation,
  ShiftAnimation,
  CameraTransitionAnimation,
} from './index';

import type {
  TypeGeneralAnimation,
  TypeShiftAnimation,
  TypeCameraTransitionAnimation,
} from './types';

export interface Animations2D{
  fadeIn:TypeGeneralAnimation<FadeInAnimation>;
  fadeOut:TypeGeneralAnimation<FadeOutAnimation>;
  shift:TypeShiftAnimation<ShiftAnimation>;
  moveCamera:TypeCameraTransitionAnimation<CameraTransitionAnimation>;
};
