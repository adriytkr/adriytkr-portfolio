import { Camera2D, Transform } from '@adriytkr/std';
import type { Camera3D, IRendererAdapter3D, PolylineDrawCommand } from '@adriytkr/std';

import type {
  CommandBuffer,
  DrawCommand,
} from '@adriytkr/std';

import * as THREE from 'three';

import type { ThreeTopology,ThreeDrawCommand } from './config';

export type CommandHandler=(buffer:DrawCommand<any,any,any>,camera:Camera3D)=>void;

export class ThreeRendererAdapter implements IRendererAdapter3D<ThreeDrawCommand>{
  private handlers=new Map<ThreeTopology,CommandHandler>();

  public constructor(
    public scene:THREE.Scene,
    public camera:THREE.Camera,
    public renderer:THREE.WebGLRenderer,
  ){
    this.handlers.set('polyline',this.drawPolyline);
  }

  public execute(buffer:CommandBuffer<ThreeDrawCommand>,camera:Camera3D):void{
    for(const command of buffer.commands){
      const handler=this.handlers.get(command.topology);
      if(!handler)continue;
      handler.call(this,command,camera);
    }
  }

  private drawPolyline(
    buffer:PolylineDrawCommand,
    camera:Camera3D,
  ):void{
    const geometry=new THREE.BufferGeometry();
    const points=buffer.geometry.points;
    const vertices=new Float32Array(points.length * 3)

    for(let i=0;i<points.length;i++){
      const p=points[i]!;
      vertices[i*3]=p.x;
      vertices[i*3+1]=p.y;
      vertices[i*3+2]=p.z;
    }

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices,3),
    );

    const material=new THREE.LineBasicMaterial({
      color:buffer.style.stroke,
    });

    const line=new THREE.Line(geometry,material);

    this.scene.add(line);
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

  public clear(){
    while(this.scene.children.length>0){
      this.scene.remove(this.scene.children[0]!);
    }
  }
}
