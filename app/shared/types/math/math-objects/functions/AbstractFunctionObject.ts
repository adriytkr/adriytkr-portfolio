import { MathObject } from '../core/MathObject';
import type { MathFunction,Interval,Point } from '~/shared/types/math/basic';

export abstract class AbstractFunctionObject extends MathObject{
  public readonly type='function';
  public domain?:Interval;
  public samples:number;

  protected m_points:Point[]=[];
  protected m_isDirty=true;

  constructor(
    id:number,
    samples:number,
    domain?:Interval,
  ){
    super(id);
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
