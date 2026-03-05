export interface Growable{
  from:Point;
  to:Point;
}

export interface Shiftable{
  shift:(delta:Point)=>void;
}
