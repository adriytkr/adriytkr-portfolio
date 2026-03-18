import type { Arc } from '@adriytkr/math';
import { View } from '../View';

export class ArcView extends View<Arc>{
  public constructor(model:Arc){
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

    const startAngle=-m.startAngle$.value;
    const endAngle=-m.endAngle$.value;
    const isCCW=!m.clockwise$.value;

    const center=this.project(m.position.x$.value,m.position.y$.value);
    g.moveTo(center.x,center.y);
    g.arc(
      center.x,
      center.y,
      m.radius$.value*zoom,
      startAngle,
      endAngle,
      isCCW,
    );
    g.closePath();
    g.fill();

    g.arc(
      center.x,
      center.y,
      m.radius$.value*zoom,
      startAngle,
      endAngle,
      isCCW
    );
    g.stroke();
  }
}
