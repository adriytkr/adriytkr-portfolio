export abstract class BaseSignal<T> {
  protected m_value:T;
  protected m_subscribers=new Set<()=>void>();

  public constructor(value:T){
    this.m_value=value;
  }

  public subscribe(subscriber:()=>void):void{
    this.m_subscribers.add(subscriber);
  }

  abstract get value():T;
  abstract set value(v:T);
}
