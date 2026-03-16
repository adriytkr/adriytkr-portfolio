export type Subscriber<T>=(value:T)=>void;

export class Signal<T>{
  private m_value:T;
  private m_subscribers=new Set<Subscriber<T>>();

  public constructor(value:T){
    this.m_value=value;
  }

  public get value():T{
    return this.m_value;
  }

  public set value(newValue:T){
    if(this.value===newValue)return;

    this.m_value=newValue;
    this.m_subscribers.forEach(fn=>fn(this.m_value));
  }

  public subscribe(subscriber:Subscriber<T>):()=>void{
    this.m_subscribers.add(subscriber);
    return ()=>this.unsubscribe(subscriber);
  }

  private unsubscribe(subscriber:Subscriber<T>):void{
    this.m_subscribers.delete(subscriber);
  }

  public bind(other:Signal<T>):()=>void{
    this.value=other.value;
    return other.subscribe(v=>{
      this.value=v;
    });
  }
}
