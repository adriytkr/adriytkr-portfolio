import {AbstractFunctionObject} from '~/shared/types/math/math-objects/AbstractFunctionObject';

export class LinearFunctionObject extends AbstractFunctionObject{
  private m_m:number;
  private m_b:number;
  constructor(id:number,slope:number,yIntercept:number,domain:Interval,samples:number){
    super(id,domain,samples);
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
