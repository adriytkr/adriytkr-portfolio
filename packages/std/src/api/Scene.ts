import { SystemManager, World, type ISystem } from '@adriytkr/engine';
import type { SceneNode } from './SceneNode';

export class Scene{
  public world:World;
  private m_systemManager:SystemManager;

  public constructor(){
    this.world=new World();
    this.m_systemManager=new SystemManager;
  }

  public addSystem(system:ISystem):void{
    this.m_systemManager.add(system);
  }

  public update(delta:number):void{
    this.m_systemManager.update(this.world,delta);
  }

  public add(...objects:SceneNode[]):void{
    for(const obj of objects){
      obj.mount(this.world);
    }
  }

  public remove(...objects:SceneNode[]):void{
    for(const obj of objects){
      obj.unmount();
    }
  }
}
