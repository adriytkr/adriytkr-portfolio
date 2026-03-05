import { BaseRenderer } from '../renderers/BaseRenderer';
import type { RenderContext } from '../core';

import type { PointObject } from '@math-objects';

import * as d3 from 'd3';

export class PointRenderer extends BaseRenderer<PointObject>{
  public override get layerName(){
    return 'point';
  }

  public override render(
    points:SceneNode<PointObject>[],
    context:RenderContext,
  ){
    if(!this.m_group)return;

    const {xScale,yScale}=context;

    this.m_group
      .selectAll<SVGCircleElement,SceneNode<PointObject>>('circle.point')
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
      .attr('r',p=>p.data.size)
      .attr('cx',p=>xScale(p.data.at.x))
      .attr('cy',p=>yScale(p.data.at.y))
      .style('opacity',p=>p.style.opacity);
  }
}
