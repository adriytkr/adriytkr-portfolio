import type { ISystem, World } from '@adriytkr/engine';
import { Renderable, Transform } from '../components';
import type { IRendererAdapter, IRendererAdapter3D } from '../renderers/IRendererAdapter';
import { CommandBuffer } from '../renderers/commands/CommandBuffer';
import type { DrawCommand } from '../renderers';
import { Camera3D } from '../../3d';

export type RenderEntityCommand={
  transform:Transform;
  buffer:CommandBuffer<any>;
};

export class RendererSystem3D<T extends DrawCommand<string,any,any>> implements ISystem{
  public constructor(
    private renderer:IRendererAdapter3D<any>,
    private buffer:CommandBuffer<T>,
  ){}

  public update(world:World,delta:number):void{
    const cameraEntity=world.query(Camera3D)[0]!;
    this.buffer.clear();

    if(cameraEntity===undefined)
      throw Error('No camera?!');

    const camera=world.getComponent(cameraEntity,Camera3D)!;

    for(const entity of world.query(Renderable,Transform)){
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)!;

      for(const primitive of renderable.primitives){
        this.buffer.push({
          ...primitive,
          transform,
        });
      }
    }

    if(this.buffer.commands.length===0)return;
    this.renderer.execute(this.buffer,camera);
  }
}
