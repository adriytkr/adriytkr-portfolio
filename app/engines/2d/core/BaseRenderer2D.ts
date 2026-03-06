import { BaseRenderer } from '@engines/shared/core/BaseRenderer';
import type { RenderContext2D } from './core';

export abstract class BaseRenderer2D<TData,TStyle>
  extends BaseRenderer<TData,TStyle,d3.Selection<SVGGElement,any,any,any>,RenderContext2D>
{
  protected m_group:d3.Selection<SVGGElement,any,any,any>|null=null;

  public onMount(root:d3.Selection<SVGGElement,any,any,any>){
    this.m_group=root
      .append('g')
      .attr('class',`renderer-layer ${this.layerName}`);
    return this.m_group;
  }

  public clear(){
    if(!this.m_group)return;
    this.m_group
      .selectAll('*')
      .remove();
  }
}
