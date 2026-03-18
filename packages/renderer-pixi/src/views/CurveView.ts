import type { ParametricCurve } from '@adriytkr/math';
import { View } from '../View';

export class CurveView extends View {
  private m_model:ParametricCurve;

  constructor(model:ParametricCurve){
    super();
    this.m_model=model;
  }

  public override init():void{
    this.mark(this.m_model.position.x$.subscribe(x=>this.graphics.x=x));
    this.mark(this.m_model.position.y$.subscribe(y=>this.graphics.y=y));
  }

  // renderer/CurveView.ts
  public override redraw(): void {
    const g=this.graphics;
    const m=this.m_model;

    g.clear();
    g.setStrokeStyle({
      color:m.style.stroke$.value,
      width:m.style.strokeWidth$.value,
    });

    const tStart=m.tMin$.value;
    const tEnd=m.tMax$.value;
    const resolution=m.resolution;

    const step=(tEnd-tStart)/resolution;

    const firstPoint=m.getPoint(tStart);
    g.moveTo(firstPoint.x,-firstPoint.y);

    for(let i=1;i<=resolution;i++){
      const t=tStart+(step*i);
      const point=m.getPoint(t);
      
      g.lineTo(point.x,-point.y);
    }

    g.stroke();
  }
}
