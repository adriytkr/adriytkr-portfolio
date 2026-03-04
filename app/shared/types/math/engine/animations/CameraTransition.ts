import { BaseAnimation } from '~/shared/types/math/engine/animations/BaseAnimation';

export class CameraTransition extends BaseAnimation{
  public camera:CameraObject;
  public startDomain:Interval=[0,0];
  public startRange:Interval=[0,0];
  public targetDomain:Interval;
  public targetRange:Interval;

  public constructor(
    camera:CameraObject,
    targetDomain:Interval,
    targetRange:Interval,
    options:AnimationOptions,
  ){
    super(options);
    this.camera=camera;
    this.targetDomain=targetDomain;
    this.targetRange=targetRange;
  }

  public override setup(){
    this.startDomain=[...this.camera.domain];
    this.startRange=[...this.camera.range];
  }

  public override update(alpha:number){
    this.camera.domain = [
      this.startDomain[0]+(this.targetDomain[0]-this.startDomain[0])*alpha,
      this.startDomain[1]+(this.targetDomain[1]-this.startDomain[1])*alpha,
    ];
    this.camera.range = [
      this.startRange[0]+(this.targetRange[0]-this.startRange[0])*alpha,
      this.startRange[1]+(this.targetRange[1]-this.startRange[1])*alpha,
    ];
  }

  public override resolve():void{}
}
