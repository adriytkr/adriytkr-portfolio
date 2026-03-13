import type { Entity, World } from '@adriytkr/engine';
import { Hierarchy } from '../common';
import { Transform } from '../common';

export abstract class SceneNode{
  protected entity:Entity|null=null;
  protected world:World|null=null;
  protected parent:SceneNode|null=null;
  protected children:SceneNode[]=[];

  public add(...objects:SceneNode[]){
    for(const obj of objects){

      if(obj.parent)obj.parent.remove(obj);

      obj.parent = this
      this.children.push(obj)

      if (this.world) {
        obj.onMount(this.world);
        this.linkChildEntity(obj)
      }
    }
  }

  public remove(...objects:SceneNode[]){
    for(const obj of objects){

      const index=this.children.indexOf(obj);

      if(index === -1)continue;

      this.children.splice(index,1);

      obj.parent=null;

      if(this.world&&obj.entity!==null){
        const hierarchy=this.world.getComponent(
          obj.entity,
          Hierarchy,
        )!;

        hierarchy.parent=null;

        const parentHierarchy=this.world.getComponent(
          this.entity!,
          Hierarchy,
        )!;

        parentHierarchy.children.delete(obj.entity);
      }

    }
  }

  mount(world: World) {

    if (this.entity !== null) return

    this.world = world
    this.entity = world.createEntity()

    world.addComponent(this.entity, new Transform())
    world.addComponent(this.entity, new Hierarchy())

    this.onMount(world)

    // mount children recursively
    for (const child of this.children) {

      child.mount(world)

      this.linkChildEntity(child)

    }

  }

  unmount() {

    if (!this.world || this.entity === null) return

    for (const child of this.children) {
      child.unmount()
    }

    this.world.destroyEntity(this.entity)

    this.entity = null
    this.world = null

  }

  public abstract onMount(world:World):void;
  public abstract onUnmount(world:World):void;

  public linkChildEntity(child:SceneNode){
    const childHierarchy=
      this.world!.getComponent(child.entity!,Hierarchy)!;
    const parentHierarchy=
      this.world!.getComponent(this.entity!,Hierarchy)!;

    childHierarchy.parent=this.entity;
    parentHierarchy.children.add(child.entity!);
  }
}
