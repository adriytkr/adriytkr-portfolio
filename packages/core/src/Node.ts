export class Node{
  private parent:Node|null=null;
  private children:Node[]=[];

  public constructor(){}

  public add(child:Node):void{
    if(child.parent!==null){
      console.warn('Node already has a parent');
      return;
    }

    this.children.push(child);
    child.parent=this;
  }

  public remove(child:Node){
    const childIndex=this.children.indexOf(child);

    if(childIndex===-1){
      console.warn('Target node is not child of this node');
      return;
    }

    this.children.splice(childIndex,1);
    child.parent=null;
  }

  public detach():void{
    if(this.parent){
      this.parent.remove(this);
    }
  }

  // public get position():Vector3{
  //   return this.m_transform.position;
  // }

  // public get rotation():Vector4{
  //   return this.m_transform.rotation;
  // }

  // public get scale():Vector3{
  //   return this.m_transform.scale;
  // }
}
