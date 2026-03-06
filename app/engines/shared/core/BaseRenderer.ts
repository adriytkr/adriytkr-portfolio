import type { SceneNode } from './SceneNode';

export abstract class BaseRenderer<TData,TStyle,TSurface,TContext>{
  public isMounted=false;

  public abstract get layerName():string;

  public mount(root:TSurface){
    if(this.isMounted)return;

    this.onMount(root);
    this.isMounted=true;
  }

  protected abstract onMount(root:TSurface):TSurface;

  public abstract render(
    objects:SceneNode<TData,TStyle,TSurface,TContext>[],
    context:TContext
  ):void;

  public abstract clear():void;
}
