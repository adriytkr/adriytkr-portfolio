import type { CameraObject } from './CameraObject';

import * as d3 from 'd3';

export interface RenderContext{
  xScale:d3.ScaleLinear<number,number>;
  yScale:d3.ScaleLinear<number,number>;
  activeCamera:CameraObject;
};
