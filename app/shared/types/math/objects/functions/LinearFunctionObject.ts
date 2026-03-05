import { AbstractFunctionObject } from './AbstractFunctionObject';
import type { Interval } from '@math/basic/';

export class LinearFunctionObject extends AbstractFunctionObject{
  private m_m:number;
  private m_b:number;

  public constructor(
    slope:number,
    yIntercept:number,
    samples:number,
    domain?:Interval,
  ){
    super(samples,domain);
    this.m_m=slope;
    this.m_b=yIntercept;
  }

  public setParameters(slope:number,yIntercept:number){
    this.m_m=slope;
    this.m_b=yIntercept;
    this.m_isDirty=true;
  }

  public override evaluate=(x:number):number=>
    this.m_m*x+this.m_b;
}
