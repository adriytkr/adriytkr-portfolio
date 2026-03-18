import type { Polygon } from '@adriytkr/math';
import { View } from '../View';

export class PolygonView extends View{
  private m_model:Polygon;

  public constructor(model:Polygon){
    super();
    this.m_model=model;
  }

  public override init():void{}

  public override redraw():void{
    const g=this.graphics;
    const m=this.m_model;
    const zoom=1;

    g.clear();

    g.setStrokeStyle({
      color:m.style.stroke$.value,
      width:m.style.strokeWidth$.value,
    });

    g.setFillStyle({
      color:m.style.fill$.value,
    });

    const vertices=m.vertices$.value;
    if(vertices.length<2)return;

    g.moveTo(vertices[0]!.x*zoom,vertices[0]!.y*zoom);

    for(let i=1;i<vertices.length;i++){
      g.lineTo(vertices[i]!.x*zoom,vertices[i]!.y*zoom);
    }

    g.closePath();
    
    g.fill();
    g.stroke();
  }
}
