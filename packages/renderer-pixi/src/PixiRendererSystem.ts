import type { ISystem,World } from '@adriytkr/engine';
import * as PIXI from 'pixi.js';
import { Transform } from '@adriytkr/std';
import { PixiRenderable } from './PixiRenderable';

export class PixiRendererSystem implements ISystem{
  private renderer!:PIXI.Renderer;
  private root=new PIXI.Container();

  public async init(canvas:HTMLCanvasElement){
    this.renderer=await PIXI.autoDetectRenderer({
      canvas,
      width:800,
      height:800,
      antialias:true,
    });
  }

  public update(world:World,dt:number):void{
    const entities=world.query(Transform,PixiRenderable);

    for(const entity of entities){
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,PixiRenderable)!;

      if(renderable.graphics.parent===null)this.root.addChild(renderable.graphics);

      renderable.graphics.x=transform.worldPosition.x;
      renderable.graphics.y=transform.worldPosition.y;
      renderable.graphics.zIndex=transform.worldPosition.z;
      renderable.update(renderable.graphics);
    }

    this.renderer.render({container:this.root});
  }

  public dispose(){
    if(this.renderer)this.renderer.destroy();
  }
}
