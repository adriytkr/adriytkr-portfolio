import { BaseRenderer } from '../renderers/BaseRenderer';
import type { RenderContext } from '../core';

import type { VectorObject } from '@math-objects';

import * as d3 from 'd3';

export class VectorRenderer extends BaseRenderer<VectorObject>{
  public constructor(
    parentSlection:d3.Selection<SVGGElement,unknown,null,undefined>,
  ){
    super(parentSlection,'vectors-layer');
    this.addArrowHeadMarker();
  }

  private addArrowHeadMarker(){
    const svg=d3.select(this.group.node());
    if(svg){
      const defs=svg.select('defs').empty()
        ?svg.append('defs')
        :svg.select('defs');

      defs
        .append('defs')
        .append('marker')
        .attr('id','arrow')
        .attr('viewBox','0 0 10 10')
        .attr('refX',10)
        .attr('refY',5)
        .attr('markerWidth',6)
        .attr('markerHeight',6)
        .attr('orient','auto')
        .append('path')
        .attr('d','M 0 0 L 10 5 L 0 10 z')
        .attr('fill','black');
    }
  }

  public override render(
    vectors:VectorObject[],
    context:RenderContext,
  ){
    const {xScale,yScale,getObjectStyle}=context;

    this.group
      .selectAll<SVGLineElement,VectorObject>('line.vector')
      .data(vectors,v=>v.id)
      .join(
        enter=>
          enter
            .append('line')
            .attr('data-id',v=>v.id)
            .attr('class','vector')
            .attr('stroke','black')
            .attr('stroke-width',3)
            .attr('marker-end','url(#arrow)'),
        update=>update,
        exit=>exit.remove(),
      )
      .style('opacity',v=>getObjectStyle(v).opacity)
      .attr('x1',v=>xScale(v.from.x))
      .attr('y1',v=>yScale(v.from.y))
      .attr('x2',v=>xScale(v.to.x))
      .attr('y2',v=>yScale(v.to.y));
  }
}
