import {
  DirtyTag,
  FunctionObject,
  Hierarchy,
  Renderable,
  Transform,
} from '../../common';

import type { FunctionOptions } from '../../common';

import { SceneNode } from '../SceneNode';
import type { World } from '@adriytkr/engine';

export class FunctionSceneObject extends SceneNode{
  public fn:(x:number)=>number;
  public samples:number;
  public domain:[number,number];

  public constructor(options:FunctionOptions){
    super();
    this.fn=options.fn;
    this.samples=options.samples;
    this.domain=options.domain;
  }

  public makeDirty():void{
    if(!this.world||!this.entity)return;

    this.world.addComponent(this.entity,new DirtyTag());
  }

  public setDomain(domain:[number,number]){
    this.domain=domain;

    if(this.world && this.entity){
      const fnObj = this.world.getComponent(
        this.entity,
        FunctionObject
      )!

      fnObj.domain = domain
    }
    
    this.makeDirty();
  }

  public override onMount(world:World):void{
    if(this.entity===null)return;

    this.world=world;

    world.addComponent(this.entity,new FunctionObject({
      fn:this.fn,
      samples:this.samples,
      domain:this.domain,
    }));
    world.addComponent(this.entity,new Renderable());
    world.addComponent(this.entity,new DirtyTag());
  }

  public override onUnmount(world:World):void{

  }
}