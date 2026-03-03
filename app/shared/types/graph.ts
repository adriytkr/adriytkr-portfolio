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

export class AxesObject extends MathObject{
  constructor(id:number){
    super(id);
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
  public samples:number;

  constructor(
    id:number,
    f:MathFunction,
    domain:Interval,
    samples:number,
  ) {
    super(id);
    this.f=f;
    this.domain=domain;
    this.samples=samples;
    this.updatePoints();
  }
  public updatePoints(){
      const [min, max] = this.domain;
      const step = (max - min) / this.samples;
      const newPoints = [];
      for (let i = 0; i <= this.samples; i++) {
        const x = min + i * step;
        newPoints.push({ x, y: this.f(x) });
      }
      this.points=newPoints;
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
  axes?:d3Selection;
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
    parameterChange:(name:string,startValue:number,endValue:number,theFunc:(t:number)=>void,options?:AnimationOptions)=>LazyAnimation;
  },
  addAxes:()=>void;
};
