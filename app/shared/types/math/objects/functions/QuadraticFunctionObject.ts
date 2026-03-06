import { PolynominalFunctionObject } from './PolynomialFunctionObject';
import type { Interval } from '@math/basic/';

export class QuadraticFunctionObject extends PolynominalFunctionObject{
  private m_a:number;
  private m_b:number;
  private m_c:number;

  public constructor(
    a:number,
    b:number,
    c:number,
    samples:number,
    domain?:Interval
  ){
    super([c,b,a],samples,domain);
    this.m_a=a;
    this.m_b=b;
    this.m_c=c;
  }

  public setParameters(a:number,b:number,c:number){
    this.m_a=a;
    this.m_b=b;
    this.m_c=c;
    this.m_isDirty=true;
  }

  public override evaluate=(x:number)=>
    this.m_a*x**2+this.m_b*x+this.m_c;
}
