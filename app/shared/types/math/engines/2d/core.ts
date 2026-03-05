import type { BaseAnimation,Animations2D } from './animations/';
import type { CameraObject,MathObject } from '@math-objects';
import type { BaseRenderer } from './renderers/';

import * as d3 from 'd3';

export interface ObjectStyle{
  opacity:number;
};

export interface RenderContext{
  xScale:d3.ScaleLinear<number,number>;
  yScale:d3.ScaleLinear<number,number>;
  activeCamera:CameraObject;
  getObjectStyle:GetObjectStyle;
};

export type GetObjectStyle=(object:MathObject)=>ObjectStyle;

export interface IGraphAPI2D{
  add:(obj:MathObject)=>void;
  remove:(obj:MathObject)=>void;
  clear:()=>void;
  play:(...animations:BaseAnimation[])=>Promise<void[]>;
  setActiveCamera:(camera:CameraObject)=>void;
  requestUpdate:()=>void;
  registerRenderer:(name:string,renderer:BaseRenderer<MathObject>)=>void,
  animate:Animations2D;
  root:d3.Selection<SVGGElement,unknown,null,undefined>;
};
