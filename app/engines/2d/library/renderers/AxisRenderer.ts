import { BaseRenderer2D } from '@engines/2d/core/BaseRenderer2D';

import type { AxisData } from '../data/AxisData';
import type { AxisStyle } from '../data/AxisStyle';
import type { Selection } from 'd3-selection';
import type { SceneNode2D } from '@engines/2d/core/SceneNode2D';
import type { RenderContext2D } from '../../core/core';

import * as d3 from 'd3';

export class AxisRenderer extends BaseRenderer2D<AxisData,AxisStyle>{
  public override get layerName():string{
    return 'axes';
  }

  public override render(
    axes:SceneNode2D<AxisData,AxisStyle>[],
    context:RenderContext2D
  ){
    const {xScale,yScale,activeCamera}=context;

    this.m_group!
      .selectAll<SVGGElement,SceneNode2D<AxisData,AxisStyle>>('g.axis')
      .data(axes,d=>d.id)
      .join('g')
      .attr('class','axis')
      .each((node,i,groups)=>{
        const g=d3.select(groups[i]);
        const {origin,vector,domain,unitLength,tickSize}=node.data;
        const ticks=[];

        let p1:Point;
        let p2:Point;

        if(domain){
          p1={
            x:origin.x+vector.x*domain[0],
            y:origin.y+vector.y*domain[0],
          };

          p2={
            x:origin.x+vector.x*domain[1],
            y:origin.y+vector.y*domain[1],
          };

          for(let val=domain[0];val<=domain[1];val+=unitLength)
            ticks.push(val);
        }else{
          const [minX,maxX]=activeCamera.domain;
          const [minY,maxY]=activeCamera.range;

          let tXenter=-Infinity;
          let tXleave=Infinity;
          if(vector.x!==0){
            const tX1=minX/vector.x;
            const tX2=maxX/vector.x;
            tXenter=Math.min(tX1,tX2);
            tXleave=Math.max(tX1,tX2);
          }else{
            // checke whether line is within x boundaries
            if(origin.x<minX||origin.x>maxX){
              g
                .selectAll('*')
                .remove();
              return;
            }
          }

          let tYenter=-Infinity;
          let tYleave=Infinity;
          if(vector.y!==0){
            let tY1=minY/vector.y;
            let tY2=maxY/vector.y;
            tYenter=Math.min(tY1,tY2);
            tYleave=Math.max(tY1,tY2);
          }else{
            // checke whether line is within y boundaries
            if(origin.y<minY||origin.y>maxY){
              g
                .selectAll('*')
                .remove();
              return;
            }
          }

          const tMin=Math.max(tXenter,tYenter);
          const tMax=Math.min(tXleave,tYleave);

          if(tMin>=tMax){
            g
              .selectAll('*')
              .remove();
            return;
          }

          p1={
            x:origin.x+vector.x*tMin,
            y:origin.y+vector.y*tMin,
          };

          p2={
            x:origin.x+vector.x*tMax,
            y:origin.y+vector.y*tMax,
          };

          const startTick=Math.ceil(tMin/unitLength);
          const endTick=Math.floor(tMax/unitLength);

          for(let i=startTick;i<=endTick;i++)
            ticks.push(i*unitLength);
        }

        g.selectAll('line.main-line')
          .data([null])
          .join('line')
          .attr('class','main-line')
          .attr('x1',xScale(p1.x))
          .attr('y1',yScale(p1.y))
          .attr('x2',xScale(p2.x))
          .attr('y2',yScale(p2.y))
          .attr('stroke','black');

        const norm={
          x:-vector.y,
          y:vector.x,
        };
        
        g
          .selectAll('line.tick')
          .data(ticks)
          .join('line')
          .attr('class','tick')
          .each((t,j,tickNodes)=>{
             const base={
              x:origin.x+vector.x*t,
              y:origin.y+vector.y*t,
            };
             const px=xScale(base.x);
             const py=yScale(base.y);

             d3
              .select(tickNodes[j])
              .attr('x1',px-norm.x*(tickSize/2))
              .attr('y1',py+norm.y*(tickSize/2))
              .attr('x2',px+norm.x*(tickSize/2))
              .attr('y2',py-norm.y*(tickSize/2))
              .attr('stroke','black');
          });
      });
  }
}
