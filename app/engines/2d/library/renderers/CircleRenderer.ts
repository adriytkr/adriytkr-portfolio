import { BaseRenderer2D } from '@engines/2d/core/BaseRenderer2D';
import type { Selection } from 'd3-selection';
import type { SceneNode } from '~/engines/shared/core/SceneNode';
import type { RenderContext2D } from '@engines/2d/core/core';
import type { CircleObject } from '@math-objects';
import type { CircleStyle } from './CircleStyle';
import type { SceneNode2D } from '@engines/2d/core/SceneNode2D';

export class CircleRenderer extends BaseRenderer2D<CircleObject,CircleStyle>{
  public override get layerName(){
    return 'circles';
  }

  public override render(
    circles:SceneNode<CircleObject,CircleStyle,Selection<SVGGElement,any,any,any>,
    RenderContext2D>[],
    context:RenderContext2D,
  ){
    if(!this.m_group)return;
    const {xScale,yScale}=context;

    this.m_group
      .selectAll<SVGCircleElement,SceneNode2D<CircleObject,CircleStyle>>('circle.circle')
      .data(circles,c=>c.id)
      .join(
        enter=>
          enter
            .append('circle')
            .attr('data-id',c=>c.id)
            .attr('class','circle'),
        update=>update,
        exit=>exit.remove(),
      )
      .attr('cx',c=>xScale(c.data.center.x))
      .attr('cy',c=>yScale(c.data.center.y))
      .attr('r',c=>
        Math.abs(
          xScale(c.data.center.x-c.data.radius)-
          xScale(c.data.center.x)
        )
      )
      .attr('stroke',c=>c.style.borderColor)
      .attr('fill',c=>c.style.fillColor);
  }
}