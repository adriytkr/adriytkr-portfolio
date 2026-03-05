import { AbstractFunctionObject } from '~/shared/types/math/math-objects/functions/AbstractFunctionObject';
import type { MathFunction,Interval } from '~/shared/types/math/basic';

export class GeneralFunctionObject extends AbstractFunctionObject{
  private m_f:MathFunction;
  constructor(
    f:MathFunction,
    samples:number,
    domain?:Interval,
  ){
    super(samples,domain);
    this.m_f=f;
  }
  public setFunction(f:MathFunction){
    this.m_f=f;
    this.m_isDirty=true;
  }
  public override evaluate=(x:number)=>this.m_f(x);
}
