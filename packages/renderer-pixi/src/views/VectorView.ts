import type { IVector2, Vector } from '@adriytkr/math';
import { View } from '../View';

import * as PIXI from 'pixi.js';

export class VectorView extends View<Vector>{
  public constructor(model:Vector){
    super(model);
  }

  public override init():void{}

  public override redraw():void{
    const g=this.graphics;
    const m=this.m_model;
    const zoom=this.context.camera.zoom$.value;

    g.clear();

    g.setStrokeStyle({
      color:m.style.lineStroke$.value,
      width:m.style.lineStrokeWidth$.value,
    });

    const start=this.project(
      m.position.x$.value,
      m.position.y$.value
    );

    const end=this.project(
      m.position.x$.value+m.to$.value.x,
      m.position.y$.value+m.to$.value.y,
    );

    g.moveTo(start.x,start.y);
    g.lineTo(end.x,end.y);
    g.stroke();
    g.fill();

    this.drawArrowHead(g,start,end,0.3*zoom);
  }

  private drawArrowHead(
    g:PIXI.Graphics,
    start:IVector2,
    end:IVector2,
    size:number,
  ):void{
    const angle=Math.atan2(end.y-start.y,end.x-start.x);
    
    g.beginPath();
    g.moveTo(end.x,end.y);
    g.lineTo(
      end.x-size*Math.cos(angle-Math.PI/6),
      end.y-size*Math.sin(angle-Math.PI/6),
    );
    g.lineTo(
      end.x-size*Math.cos(angle+Math.PI/6),
      end.y-size*Math.sin(angle+Math.PI/6),
    );
    g.closePath();
    g.fill();
  }
}
