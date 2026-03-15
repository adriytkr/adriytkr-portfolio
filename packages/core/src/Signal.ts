import { BaseSignal } from './BaseSignal';

export class Signal<T> extends BaseSignal<T>{
  public constructor(value:T){
    super(value);
  }

  public get value():T{
    return this.m_value;
  }

  public set value(newValue:T){
    this.m_value=newValue;
    this.m_subscribers.forEach(fn=>fn());
  }
}
