import type { Circle } from '@adriytkr/math';
import { View } from '../View';

export class CircleView extends View<Circle>{
  public constructor(model:Circle){
    super(model);
  }

  public override init():void{}

  public override redraw():void{
    const g=this.graphics;
    const m=this.m_model;
    const zoom=this.context.camera.zoom$.value;

    g.clear();

    g.setStrokeStyle({
      color:m.style.stroke$.value,
      width:m.style.strokeWidth$.value*zoom,
    });

    g.setFillStyle({
      color:m.style.fill$.value,
    });

    const center=this.project(m.position.x$.value,m.position.y$.value);
    g.circle(center.x,center.y,m.radius$.value*zoom);

    g.stroke();
    g.fill();
  }
}
