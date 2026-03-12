import type { ISystem, World } from '@adriytkr/engine';
import { ArcGeometry, PolygonGeometry, PolylineGeometry } from '../geometry';
import { Renderable, Transform } from '../components';
import type { IRendererAdapter } from '../renderers/IRendererAdapter';
import { Camera2D } from '../../2d';
import { CommandBuffer, type DrawCommand } from './CommandBuffer';

export type RenderEntityCommand={
  transform:Transform;
  buffer:CommandBuffer<any>;
};

export class RendererSystem implements ISystem{
  public constructor(
    private renderer:IRendererAdapter,
    private buffer=new CommandBuffer(),
  ){}

  public update(world:World,delta:number):void{
    const cameraEntity=world.query(Camera2D)[0]!;
    this.buffer.clear();

    if(cameraEntity===undefined)
      throw Error('No camera?!');

    const camera=world.getComponent(cameraEntity,Camera2D)!;

    // for(const entity of world.query(Transform,Renderable,DirtyFlag)){
    for(const entity of world.query(Transform,Renderable)){
      const transform=world.getComponent(entity,Transform)!;
      const renderable=world.getComponent(entity,Renderable)!;

      for(const primitive of renderable.primitives){
        this.buffer.push({
          ...primitive,
          transform,
        });
      }

      // this.renderer.draw(geometry,transform,camera);
    }

    this.renderer.execute(this.buffer,camera);
  }
}
