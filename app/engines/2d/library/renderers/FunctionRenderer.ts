import type { CameraObject,AbstractFunctionObject } from '@math-objects';
import type { Point,Interval } from '~/shared/types/math/basic';
import type { RenderContext2D } from '@engines/2d/core/core';
import { BaseRenderer2D } from '@engines/2d/core/BaseRenderer2D';
import type { SceneNode2D } from '@engines/2d/core/SceneNode2D';
import type { HasOpacity } from '../animations';

import * as d3 from 'd3';

export class FunctionRenderer extends BaseRenderer2D<AbstractFunctionObject,HasOpacity>{
  public override get layerName(){
    return 'function';
  }

  public override render(
    functions:SceneNode2D<AbstractFunctionObject,HasOpacity>[],
    context:RenderContext2D,
  ){
    if(!this.m_group)return;

    const {xScale,yScale,activeCamera}=context;

    const pathGenerator=d3
      .line<Point>()
      .x(p=>xScale(p.x))
      .y(p=>yScale(p.y));

    this.m_group
      .selectAll<SVGPathElement,SceneNode2D<AbstractFunctionObject,any>>('path.function')
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
