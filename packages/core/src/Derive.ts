import { BaseSignal } from './BaseSignal';
import { DEFAULT_DERIVE_OPTIONS } from './constants';
import type { Signal } from './Signal';
import type { DeriveOptions } from './types';
import { flattenSignals } from './utils';

export class Derive<T> extends BaseSignal<T>{
  private m_dirty=true;
  private m_deps:(Signal<any>|Derive<any>)[];
  private m_getter:()=>T;

  public constructor(
    deps:(Signal<any>|Derive<any>)[],
    getter:()=>T,
    options:DeriveOptions=DEFAULT_DERIVE_OPTIONS,
  ){
    super(getter());
    this.m_getter=getter;
    this.m_deps=options.deep?flattenSignals(deps):deps;

    const update=()=>{
      this.m_dirty=true;
      this.m_subscribers.forEach(fn=>fn());
    };

    for(const dep of this.m_deps)
      dep.subscribe(update);
  }

  public get value():T{
    if(this.m_dirty){
      this.m_value=this.m_getter();
      this.m_dirty=false;
    }

    return this.m_value;
  }

  public set value(newValue:T){
    throw new Error('Cannot write to a Derive');
  }
}