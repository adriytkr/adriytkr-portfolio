import type { ISystem, World } from '@adriytkr/engine';
import { PolylineGeometry } from '../geometry';
import { Transform } from '../components';
import type { IRendererAdapter } from '../renderers/IRendererAdapter';
import { Camera2D } from '../../2d';

export class RendererSystem implements ISystem{
  private renderer:IRendererAdapter;

  public constructor(renderer:IRendererAdapter){
    this.renderer=renderer;
  }

  public update(world:World,delta:number):void{
    const cameraEntity=world.query(Camera2D)[0]!;

    if(cameraEntity===undefined)
      throw Error('No camera?!');

    const camera=world.getComponent(cameraEntity,Camera2D)!;

    for(const entity of world.query(Transform,PolylineGeometry)){
      const transform=world.getComponent(entity,Transform)!;
      const geometry=world.getComponent(entity,PolylineGeometry)!;
      this.renderer.draw(geometry,transform,camera);
    }
  }

  private applyTransform(
    point:{x:number;y:number},
    transform:Transform,
    camera:Camera2D,
  ){
    let x=point.x*transform.worldScale.x;
    let y=point.y*transform.worldScale.y;

    const theta=2*Math.atan2(transform.worldRotation.z,transform.worldRotation.w);
    const cosR=Math.cos(theta);
    const sinR=Math.sin(theta);

    const xRot=x*cosR-y*sinR;
    const yRot=x*sinR+y*cosR;

    x=xRot+transform.worldPosition.x;
    y=yRot+transform.worldPosition.y;

    const screenX=(x-camera.x)*camera.zoom+camera.width/2;
    const screenY=(camera.y-y)*camera.zoom+camera.height/2;

    return {x:screenX,y:screenY,z:0};
  }
}
