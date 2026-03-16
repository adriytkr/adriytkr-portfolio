import { Derive } from './Derive';
import { Signal } from './Signal';
import { Vector2 } from './Vector2';

export class Node{
  private m_parent:Node|null=null;
  private m_children:Node[]=[];

  public localPosition:Signal<Vector2>;
  public worldPosition:Derive<Vector2>;

  public constructor(){
    this.localPosition=new Signal<Vector2>(new Vector2(0,0));
    this.worldPosition=new Derive(
      [
        this.localPosition,
      ],
      ()=>this.localPosition.value,
      {deep:true},
    );
  }

  public add(child:Node):void{
    if(child.m_parent!==null){
      console.warn('Node already has a parent');
      return;
    }

    this.m_children.push(child);
    child.m_parent=this;
    child.rebuildWorldPosition();
  }

  public remove(child:Node){
    const childIndex=this.m_children.indexOf(child);

    if(childIndex===-1){
      console.warn('Target node is not child of this node');
      return;
    }

    this.m_children.splice(childIndex,1);
    child.m_parent=null;
    child.localPosition.value=new Vector2(
      child.worldPosition.value.x.value,
      child.worldPosition.value.y.value,
    );
    child.rebuildWorldPosition();
  }

  public get parent():Node|null{
    return this.m_parent;
  }

  public detach():void{
    if(this.m_parent){
      this.m_parent.remove(this);
    }
  }

  private rebuildWorldPosition(){
    if(this.parent){
      this.worldPosition=new Derive(
        [
          this.localPosition,
          this.parent.worldPosition,
        ],
        ()=>new Vector2(
          this.localPosition.value.x.value+this.parent!.worldPosition.value.x.value,
          this.localPosition.value.y.value+this.parent!.worldPosition.value.y.value,
        ),
        {deep:true},
      );
    }else{
      this.worldPosition=new Derive(
        [
          this.localPosition.value.x,
          this.localPosition.value.y,
        ],
        ()=>this.localPosition.value,
      );
    }

    for(const child of this.m_children)
      child.rebuildWorldPosition();
  }
}
