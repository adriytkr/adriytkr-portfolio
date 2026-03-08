import { Component } from '@adriytkr/engine';
import type { Entity } from '@adriytkr/engine';

export class Hierarchy extends Component{
  public parent:Entity|null=null;
  public children:Set<Entity>=new Set();

  public constructor(parent:Entity|null=null){
    super();
    this.parent=parent;
  }
}
