import type { CameraObject,AbstractFunctionObject } from '@math-objects';
import type { Point,Interval } from '~/shared/types/math/basic';
import { BaseRenderer } from '@engines/2d/core/BaseRenderer';
import type { RenderContext } from '@engines/2d/core/core';
import { SceneNode } from '@engines/2d/core/SceneNode';

import * as d3 from 'd3';

export class FunctionRenderer extends BaseRenderer<AbstractFunctionObject>{
  public override get layerName(){
    return 'function';
  }

  public override render(
    functions:SceneNode<AbstractFunctionObject>[],
    context:RenderContext,
  ){
    if(!this.m_group)return;

    const {xScale,yScale,activeCamera}=context;

    const pathGenerator=d3
      .line<Point>()
      .x(p=>xScale(p.x))
      .y(p=>yScale(p.y));

    this.m_group
      .selectAll<SVGPathElement,SceneNode<AbstractFunctionObject>>('path.function')
      .data(functions,f=>f.id)
      .join(
        enter=>
          enter
            .append('path')
            .attr('data-id',f=>f.id)
            .attr('class','function')
            .attr('fill','none')
            .attr('stroke','black')
            .attr('stroke-width',2),
        update=>update,
        exit=>exit.remove(),
      )
      .attr('d',f=>this.genereatePathBasedOnCameraBounds(f.data,activeCamera,pathGenerator))
      .style('opacity',f=>f.style.opacity);
  }

  public genereatePathBasedOnCameraBounds(
    func:AbstractFunctionObject,
    camera:CameraObject,
    pathGenerator:d3.Line<Point>,
  ){
    if(!func.domain)
      return pathGenerator(func.generatePoints(camera.domain));

    const visibleDomain:Interval=[
      Math.max(func.domain[0],camera.domain[0]),
      Math.min(func.domain[1],camera.domain[1]),
    ];

    if(visibleDomain[0]>visibleDomain[1])return'';
    return pathGenerator(func.generatePoints(visibleDomain));
  }
}
