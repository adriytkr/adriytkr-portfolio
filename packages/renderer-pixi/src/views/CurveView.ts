import type { ParametricCurve } from '@adriytkr/math';
import { View } from '../View';

export class CurveView extends View<ParametricCurve>{
  constructor(model:ParametricCurve){
    super(model);
  }

  public override init():void{}

  public override redraw():void{
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

    const firstMathPoint=m.getPoint(tStart);
    const firstScreenPoint=this.project(firstMathPoint.x,firstMathPoint.y);
    g.moveTo(firstScreenPoint.x,firstScreenPoint.y);

    for(let i=1;i<=resolution;i++){
      const t=tStart+(step*i);
      const mathPoint=m.getPoint(t);
      
      const screenPoint=this.project(mathPoint.x,mathPoint.y);
      g.lineTo(screenPoint.x,screenPoint.y);
    }

    g.stroke();
  }
}
