import type { RenderContext } from './core';
import type { SceneNode } from './SceneNode';

import * as d3 from 'd3';

export abstract class BaseRenderer<T>{
  protected m_group:d3.Selection<SVGGElement,unknown,null,undefined>|null=null;
  private m_isMounted=false;

  public get isMounted(){
    return this.m_isMounted;
  }

  public abstract get layerName():string;

  public mount(root:d3.Selection<SVGGElement,unknown,null,undefined>){
    if(this.m_isMounted)return;

    this.m_group=root
      .append('g')
      .attr('class',`renderer-layer ${this.layerName}`);

    this.m_isMounted=true;
  }

  public abstract render(
    objects:SceneNode<T>[],
    context:RenderContext,
  ):void;

  public clear(){
    if(!this.m_group)return;
    this.m_group
      .selectAll('*')
      .remove();
  }
}
