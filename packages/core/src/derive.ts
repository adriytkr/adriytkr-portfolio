import { Signal } from './Signal';

export function derive<T>(
  dependencies:Signal<any>[],
  compute:()=>T,
):Signal<T>{
  const result=new Signal(compute());

  const update=()=>{
    console.log('hi');
    result.value=compute();
  };

  dependencies.forEach(signal=>{
    signal.subscribe(update);
  });

  return result;
}
