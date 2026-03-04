import type {Interval} from '~/shared/types/math/basic';

export const isNumberInInterval=(n:number,interval:Interval):boolean=>
  interval[0]<=n&&n<=interval[1];
