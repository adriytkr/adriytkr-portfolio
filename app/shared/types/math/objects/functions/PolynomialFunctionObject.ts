import { AbstractFunctionObject } from './AbstractFunctionObject';

export class PolynominalFunctionObject extends AbstractFunctionObject{
  private m_coefficients:number[];

  public constructor(
    coefficients:number[],
    samples:number,
    domain?:Interval,
  ){
    super(samples,domain);
    this.m_coefficients=coefficients;
  }

  public override evaluate=(x:number)=>
    this.m_coefficients.reduceRight((acc,coeff)=>acc*x+coeff,0);
}
