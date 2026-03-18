import type {
  AxesStyleOptions,
  ClosedStyleOptions,
  PolylineStyleOptions,
  VectorStyleOptions,
} from '../types';

export interface Theme{
  ClosedStyle:ClosedStyleOptions,
  PolylineStyle:PolylineStyleOptions,
  VectorStyle:VectorStyleOptions,
  AxesStyle:AxesStyleOptions,
}

export const MathClassic:Theme={
  ClosedStyle:{
    fill:'red',
    stroke:'red',
    strokeWidth:1,
    opacity:1,
  },
  PolylineStyle:{
    stroke:'red',
    strokeWidth:2,
    opacity:1,
  },
  VectorStyle:{
    arrowFill:'blue',
    arrowStroke:'blue',
    arrowStrokeWidth:1,
    lineFill:'blue',
    lineStroke:'blue',
    lineStrokeWidth:5,
    opacity:1,
  },
  AxesStyle:{
    color:'red',
    opacity:0.6,
  },
};
