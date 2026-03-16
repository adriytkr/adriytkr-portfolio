import { Signal } from "./Signal";

export interface WatchOptions{
  immediate:boolean;
}

export const DEFAULT_WATCH_OPTIONS:WatchOptions={
  immediate:false,
};

export function watch<T>(
  signal:Signal<T>,
  fn:(newValue:T,oldValue:T)=>void,
  options?:WatchOptions,
):()=>void;

export function watch(
  signals:Signal<any>[],
  fn:()=>void,
  options?:WatchOptions,
):()=>void;

export function watch(
  target:Signal<any>|Signal<any>[],
  fn:(...args:any[])=>void,
  options:WatchOptions=DEFAULT_WATCH_OPTIONS,
):()=>void{
  if(options.immediate)fn();

  if(target instanceof Signal){
    let oldValue=target.value;
    return target.subscribe((newValue)=>{
      fn(newValue,oldValue);
      oldValue=newValue;
    });
  }

  const unsubscribers=target.map(signal=>
    signal.subscribe(()=>fn()),
  );

  return ()=>{
    unsubscribers.forEach(unsubscriber=>unsubscriber());
  };
}
