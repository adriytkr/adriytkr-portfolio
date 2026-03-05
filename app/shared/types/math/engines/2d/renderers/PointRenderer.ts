import { BaseRenderer } from '../renderers/BaseRenderer';
import type { RenderContext } from '../core';

import type { PointObject } from '@math-objects';

import * as d3 from 'd3';

export class PointRenderer extends BaseRenderer<PointObject>{
  public constructor(
    parentSlection:d3.Selection<SVGGElement,unknown,null,undefined>,
  ){
    super(parentSlection,'points-layer');
  }

  public override render(
    points:PointObject[],
    context:RenderContext,
  ){
    const {xScale,yScale,getObjectStyle}=context;

    this.group
      .selectAll<SVGCircleElement,PointObject>('circle.point')
      .data(points,p=>p.id)
      .join(
        enter=>
          enter
            .append('circle')
            .attr('data-id',p=>p.id)
            .attr('class','point')
            .attr('fill','black'),
        update=>update,
        exit=>exit.remove(),
      )
      .attr('r',p=>p.size)
      .attr('cx',p=>xScale(p.at.x))
      .attr('cy',p=>yScale(p.at.y))
      .style('opacity',p=>getObjectStyle(p).opacity);
  }
}
