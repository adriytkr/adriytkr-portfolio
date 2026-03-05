import type {Interval} from '@math/basic/';

export const isNumberInInterval=(n:number,interval:Interval):boolean=>
  interval[0]<=n&&n<=interval[1];
