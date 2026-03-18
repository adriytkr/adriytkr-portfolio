import type { Point } from '@adriytkr/math';
import { View } from '../View';

export class PointView extends View{
  private m_model:Point;

  public constructor(model:Point){
    super();
    this.m_model=model;
  }

  public init():void{}

  public override redraw():void{
    const g=this.graphics;
    const m=this.m_model;
    const zoom=1;

    g.clear();

    g.x=m.position.x$.value;
    g.y=m.position.y$.value;

    g.setFillStyle({
      color:m.style.fill$.value,
    });

    g.setStrokeStyle({
      color:m.style.stroke$.value,
      width:m.style.strokeWidth$.value,
    });

    g.circle(0,0,m.size$.value);
    
    g.stroke();
    g.fill();
  }
}
