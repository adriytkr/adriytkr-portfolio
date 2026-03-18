import { Signal } from '@adriytkr/core';
import type { VectorStyleOptions } from '../../types';

export class VectorStyle{
  public arrowStroke$:Signal<string>;
  public arrowStrokeWidth$:Signal<number>;
  public arrowFill$:Signal<string>;
  public lineStroke$:Signal<string>;
  public lineStrokeWidth$:Signal<number>;
  public lineFill$:Signal<string>;
  public opacity$:Signal<number>;

  public constructor(options:VectorStyleOptions){
    this.arrowStroke$=new Signal(options.arrowStroke);
    this.arrowStrokeWidth$=new Signal(options.arrowStrokeWidth);
    this.arrowFill$=new Signal(options.arrowFill);
    this.lineStroke$=new Signal(options.lineStroke);
    this.lineStrokeWidth$=new Signal(options.lineStrokeWidth);
    this.lineFill$=new Signal(options.lineFill);
    this.opacity$=new Signal(options.opacity);
  }

  public static copy(style:VectorStyleOptions):VectorStyle{
    return new VectorStyle({
      arrowStroke:style.arrowStroke,
      arrowStrokeWidth:style.arrowStrokeWidth,
      arrowFill:style.arrowFill,
      lineStroke:style.lineStroke,
      lineStrokeWidth:style.lineStrokeWidth,
      lineFill:style.lineFill,
      opacity:style.opacity,
    });
  }
}
