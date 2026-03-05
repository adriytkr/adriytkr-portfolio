import type { RenderContext } from '../core';

import type { MathObject } from '@math-objects';

import * as d3 from 'd3';

export abstract class BaseRenderer<T extends MathObject>{
  protected group:d3.Selection<SVGGElement,unknown,null,undefined>;

  public constructor(
    parentSlection:d3.Selection<SVGGElement,unknown,null,undefined>,
    className:string,
  ){
    this.group=parentSlection
      .append('g')
      .attr('class',className);
  }

  public abstract render(
    objects:T[],
    context:RenderContext,
  ):void;

  public clear(){
    this.group
      .selectAll('*')
      .remove();
  }
}
