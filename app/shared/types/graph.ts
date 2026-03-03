export class MathObject{
  public id:number;
  constructor(id:number){
    this.id=id;
  }
}

export class PointObject extends MathObject{
  public at:Point;
  public size:number;
  constructor(id:number,at:Point,size:number){
    super(id);
    this.at=at;
    this.size=size;
  }
};

export class VectorObject extends MathObject implements Growable{
  public from:Point;
  public to:Point;
  constructor(id:number,from:Point,to:Point){
    super(id);
    this.from=from;
    this.to=to;
  }
};

export class AxisObject extends MathObject{}

export class GridObject extends MathObject{
  public xGap:number;
  public yGap:number;

  constructor(
    id:number,
    xGap:number,
    yGap:number,
  ){
    super(id)
    this.xGap=xGap;
    this.yGap=yGap;
  }
}

export interface Growable{
  from:Point;
  to:Point;
}

export class LineObject extends MathObject implements Growable{
  public from:Point;
  public to:Point;
  constructor(id:number,from:Point,to:Point){
    super(id);
    this.from=from;
    this.to=to;
  }
}

export class FunctionObject extends MathObject{
  public points:Point[]=[];
  public f:MathFunction;
  public domain:Interval;

  constructor(
    id:number,
    f:MathFunction,
    domain:Interval,
    samples:number,
  ) {
    super(id);
    this.f=f;
    this.domain=domain;
    this.generatePoints(samples);
  }
  public generatePoints(samples:number){
    const [x0,x1]=this.domain;
    this.points=[];
    for (let i=0;i<=samples;i++){
      const step=((x1-x0)*i)/samples;
      const x=x0+step;
      this.points.push({x,y:this.f(x)});
    }
  }
}

export type MathFunction=(x:number)=>number;

type d3Selection=d3.Selection<SVGGElement,unknown,null,undefined>
export type GraphComponents={
  root?:d3Selection;
  points?:d3Selection;
  vectors?:d3Selection;
  functions?:d3Selection;
  shapes?:d3Selection;
  grids?:d3Selection;
};

export interface AnimationOptions{
  duration:number;
};

export type GeneralAnimation=(object:MathObject,options?:AnimationOptions)=>LazyAnimation;
export type GrowableAnimation=(object:Growable&MathObject,options?:AnimationOptions)=>LazyAnimation;
export type LazyAnimation=()=>Promise<void>;

export interface GraphAPI{
  add:(object:MathObject)=>void;
  remove:(object:MathObject)=>void;
  clear:()=>void;
  play:(...animations:LazyAnimation[])=>Promise<void>;
  animate:{
    fadeIn:GeneralAnimation;
    growVector:GrowableAnimation;
    fadeOut:GeneralAnimation;
    ungrowVector:GrowableAnimation;
    moveTo:(object:MathObject,target:Point,options?:AnimationOptions)=>LazyAnimation;
    shift:(object:MathObject,delta:Point,options?:AnimationOptions)=>LazyAnimation;
    applyMatrix:(object:MathObject,matrix:Matrix2x2,options?:AnimationOptions)=>LazyAnimation;
  },
};
