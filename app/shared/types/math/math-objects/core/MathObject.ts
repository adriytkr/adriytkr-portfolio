export abstract class MathObject{
  public id:number;
  abstract readonly type:string;

  constructor(id:number){
    this.id=id;
  }
}
