import type { BaseAnimation } from './BaseAnimation';
import type { SceneNode } from './SceneNode';

export abstract class BaseEngine<TSurface,TContext,TCamera>{
  protected m_nodes:SceneNode<any,any,TSurface,TContext>[]=[];
  protected m_animations:BaseAnimation<TContext>[]=[];
  protected m_needsUpdate:boolean=true;

  protected m_cameras:TCamera[]=[];
  protected m_activeCamera:TCamera;

  protected abstract getRenderContext():TContext;
  protected abstract updateScene():void;

  private m_frameId:number|null=null;

  public constructor(defaultCamera:TCamera){
    this.m_activeCamera=defaultCamera;
    this.m_cameras.push(defaultCamera);
  }

  public play(...anims:BaseAnimation<TContext>[]){
    return Promise.all(
      anims.map(anim=>
        new Promise<void>(resolve=>{
          anim.setup();
          anim.startTime=performance.now();
          anim.resolve=resolve;
          this.m_animations.push(anim);
        })
      ),
    );
  }

  public startAnimationLoop(){
    this.m_frameId=requestAnimationFrame(this.tick);
  }

  private tick=(now:number)=>{
    requestAnimationFrame(this.tick);

    const isSomeAnimationRunning=this.m_animations.length>0;
    if(!isSomeAnimationRunning&&!this.m_needsUpdate)return;

    if(isSomeAnimationRunning){
      const context=this.getRenderContext();

      this.m_animations=this.m_animations.filter(animation=>{
        const elapsed=now-animation.startTime;
        const alpha=Math.min(elapsed/animation.duration,1);

        animation.update(alpha,context);

        if(alpha===1){
          animation.resolve();
          return false;
        }

        return true;
      });

      this.m_needsUpdate=true;
    }

    if(this.m_needsUpdate){
      this.updateScene();
      this.m_needsUpdate=false;
    }
  }

  public requestUpdate(){
    this.m_needsUpdate=true;
  }

  public add(object:SceneNode<any,any,TSurface,TContext>|TCamera){
    if(this.isCamera(object)){
      this.m_cameras.push(object);
      if(!this.m_activeCamera)this.m_activeCamera=object;
    }else{
      this.m_nodes.push(object);
    }
    this.requestUpdate();
  }

  protected abstract isCamera(object:any):object is TCamera;

  public setActiveCamera(camera:TCamera){
    this.m_activeCamera=camera;
    this.requestUpdate();
  }

  public remove(node:SceneNode<any,any,TSurface,TContext>){
    this.m_nodes=this.m_nodes.filter(n=>node.id!==n.id);
    this.requestUpdate();
  }

  public clear(){
    this.m_nodes=[];
    this.requestUpdate();
  }

  public dispose(){
    if(this.m_frameId!==null)cancelAnimationFrame(this.m_frameId);
    this.m_nodes=[];
    this.m_animations=[];
    this.m_cameras=[];
    this.onDispose();
  }

  protected abstract onDispose():void;
}
