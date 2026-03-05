import { BaseRenderer } from '@engines/2d/core/BaseRenderer';
import type { RenderContext } from '@engines/2d/core/core';
import type { VectorObject } from '@math-objects';
import { SceneNode } from '@engines/2d/core/SceneNode';

import * as d3 from 'd3';

export class VectorRenderer extends BaseRenderer<VectorObject>{
  public override get layerName(){
    return 'vector';
  }

  public override mount(root:d3.Selection<SVGGElement,unknown,null,undefined>){
    super.mount(root);
    this.addArrowHeadMarker();
  }

  private addArrowHeadMarker(){
    if(!this.m_group)return;

    const svg=d3.select(this.m_group.node());
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
    vectors:SceneNode<VectorObject>[],
    context:RenderContext,
  ){
    if(!this.m_group)return;

    const {xScale,yScale}=context;

    this.m_group
      .selectAll<SVGLineElement,SceneNode<VectorObject>>('line.vector')
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
      .style('opacity',v=>v.style.opacity)
      .attr('x1',v=>xScale(v.data.from.x))
      .attr('y1',v=>yScale(v.data.from.y))
      .attr('x2',v=>xScale(v.data.to.x))
      .attr('y2',v=>yScale(v.data.to.y));
  }
}
