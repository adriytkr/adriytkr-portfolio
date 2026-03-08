import type { Entity } from './Entity';
import { SparseSet } from './SparseSet';
import { Component } from './Component';
import type { ComponentType } from './Component';

export class World{
  private m_nextEntityId=0;
  private m_entities:Set<Entity>=new Set();
  private m_stores:Map<string,SparseSet<any>>=new Map();

  public createEntity():Entity{
    const entity:Entity=this.m_nextEntityId++;
    this.m_entities.add(entity);
    return entity;
  }

  public destroyEntity(entity:Entity):void{
    if(!this.m_entities.has(entity))return;

    for(const store of this.m_stores.values())
      store.remove(entity);

    this.m_entities.delete(entity);
  }

  public addComponent<T extends Component>(entity:Entity,component:T):T{
    const componentName=component.constructor.name;
    if(!this.m_stores.has(componentName))
      this.m_stores.set(componentName,new SparseSet<T>());

    const store=this.m_stores.get(componentName)!;
    store.add(entity,component);
    return component;
  }

  public getComponent<T extends Component>(
    entityId:Entity,
    component:ComponentType<T>,
  ):T|undefined{
    return this.m_stores.get(component.name)?.get(entityId);
  }

  public query(...components:ComponentType<any>[]):Entity[]{
    if(components.length===0)return Array.from(this.m_entities);

    const stores=components
      .map(component=>this.m_stores.get(component.name))
      .filter((store):store is SparseSet<any>=>store!==undefined);

    if(stores.length!==components.length)return[];

    const primaryStore=stores[0];
    const otherStores=stores.slice(1);

    const entities:Entity[]=[];

    if(!primaryStore)return[];

    for(const entity of primaryStore.getDenseArray()){
      let hasAll=true;
      
      for(const otherStore of otherStores){
        if(!otherStore.has(entity)){
          hasAll=false;
          break;
        }
      }

      if(hasAll)entities.push(entity);
    }

    return entities;
  }
}
