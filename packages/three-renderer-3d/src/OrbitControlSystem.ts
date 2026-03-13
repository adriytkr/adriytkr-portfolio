import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { ISystem, World } from '@adriytkr/engine';
import * as THREE from 'three';
import { Camera3D, Transform } from '@adriytkr/std';

export class OrbitControlSystem implements ISystem {
  private controls: OrbitControls;

  public constructor(
    private camera: THREE.Camera, 
    private domElement: HTMLElement
  ) {
    this.controls = new OrbitControls(this.camera, this.domElement);
  }

  public update(world: World, delta: number): void {
    this.controls.update();

    const cameraEntity=world.query(Camera3D)[0];
    if(cameraEntity){
      const transform=world.getComponent(cameraEntity,Transform)!;
      
      // Update ECS transform so other systems (physics, etc.) stay in sync
      transform.localPosition.x=this.camera.position.x;
      transform.localPosition.y=this.camera.position.y;
      transform.localPosition.z=this.camera.position.z;
      transform.worldPosition={...transform.localPosition};
    }
  }
}
