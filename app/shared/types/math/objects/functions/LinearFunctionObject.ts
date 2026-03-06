import { PolynominalFunctionObject } from './PolynomialFunctionObject';
import type { Interval } from '@math/basic/';

export class LinearFunctionObject extends PolynominalFunctionObject{
  private m_m:number;
  private m_b:number;

  public constructor(
    slope:number,
    yIntercept:number,
    samples:number,
    domain?:Interval,
  ){
    super([yIntercept,slope],samples,domain);
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
