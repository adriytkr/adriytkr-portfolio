import { MathObject } from '../core/MathObject';
import type { MathFunction,Interval,Point } from '@math/basic/';

export abstract class AbstractFunctionObject extends MathObject{
  public domain?:Interval;
  public samples:number;

  protected m_points:Point[]=[];
  protected m_isDirty=true;

  constructor(
    samples:number,
    domain?:Interval,
  ){
    super();
    this.samples=samples;
    this.domain=domain;
    this.m_isDirty=true;
  }

  public generatePoints(domain:Interval):Point[]{
    const [x0,x1]=domain;
    const step=(x1-x0)/this.samples;
    const newPoints=[];
    for(let i=0;i<=this.samples;i++){
      const x=x0+i*step;
      const newPoint:Point={x,y:this.evaluate(x)};
      newPoints.push(newPoint);
    }
    return newPoints;
  }

  public abstract evaluate:MathFunction;
}
