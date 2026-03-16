import { Signal } from "./Signal";

export function flattenSignals(obj:any):Signal<any>[]{
  const signals:Signal<any>[]=[];

  function recurse(value:any){
    if(!value||typeof value!=='object')return;

    if(value instanceof Signal){
      signals.push(value);
      recurse(value.value);
      return;
    }

    for(const key in value){
      if(Object.prototype.hasOwnProperty.call(value,key))
        recurse(value[key]);
    }
  }

  recurse(obj);
  return signals;
}
