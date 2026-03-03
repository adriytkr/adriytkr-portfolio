export const isNumberInInterval=(n:number,interval:Interval):boolean=>
  interval[0]<=n&&n<=interval[1];

export const applyMatrix=(point:Point,matrix:Matrix2x2):Point=>({
  x:matrix[0][0]*point.x+matrix[0][1]*point.y,
  y:matrix[1][0]*point.x+matrix[1][1]*point.y,
});
