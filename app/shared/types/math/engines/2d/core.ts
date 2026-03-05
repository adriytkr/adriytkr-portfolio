import type { BaseAnimation,Animations2D } from './animations/';
import type { CameraObject,MathObject } from '@math-objects';
import type { BaseRenderer } from './renderers/';
import type { SceneNode } from './SceneNode';

import * as d3 from 'd3';

export interface RenderContext{
  xScale:d3.ScaleLinear<number,number>;
  yScale:d3.ScaleLinear<number,number>;
  activeCamera:CameraObject;
};

export interface IGraphAPI2D{
  add:<T extends MathObject>(node:SceneNode<T>)=>void;
  remove:<T extends MathObject>(obj:SceneNode<T>)=>void;
  clear:()=>void;
  play:(...animations:BaseAnimation[])=>Promise<void[]>;
  setActiveCamera:(camera:CameraObject)=>void;
  requestUpdate:()=>void;
  registerRenderer:(name:string,renderer:BaseRenderer<MathObject>)=>void,
  animate:Animations2D;
  root:d3.Selection<SVGGElement,unknown,null,undefined>;
};

export interface NodeStyle{
  opacity:number;
};
