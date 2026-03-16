import { Signal } from './Signal';
import { mat4, vec3, quat, mat3 } from 'gl-matrix';

export class Node{
  private m_parent:Node|null=null;
  private m_children:Node[]=[];

  public position={
    x:new Signal(0),
    y:new Signal(0),
    z:new Signal(0),
  };

  public rotation={
    x:new Signal(0),
    y:new Signal(0),
    z:new Signal(0),
  };

  public scale={
    x:new Signal(1),
    y:new Signal(1),
    z:new Signal(1),
  };

  private m_position=vec3.create();
  private m_rotation=vec3.create();
  private m_scale=vec3.fromValues(1,1,1);

  private m_localMatrixDirty=true;
  private m_worldMatrixDirty=true;

  private m_localMatrix=mat4.create();
  private m_worldMatrix=mat4.create();

  public constructor(){
    this.watchPosition();
    this.watchRotation();
    this.watchScale();
  }

  private watchPosition():void{
    this.position.x.subscribe(()=>{
      this.m_position[0]=this.position.x.value;
      this.markDirty();
    });
    this.position.y.subscribe(()=>{
      this.m_position[1]=this.position.y.value;
      this.markDirty();
    });
    this.position.z.subscribe(()=>{
      this.m_position[2]=this.position.z.value;
      this.markDirty();
    });
  }

  private watchRotation():void{
    this.rotation.x.subscribe(()=>{
      this.m_rotation[0]=this.rotation.x.value;
      this.markDirty();
    });
    this.rotation.y.subscribe(()=>{
      this.m_rotation[1]=this.rotation.y.value;
      this.markDirty();
    });
    this.rotation.z.subscribe(()=>{
      this.m_rotation[2]=this.rotation.z.value;
      this.markDirty();
    });
  }

  private watchScale():void{
    this.scale.x.subscribe(()=>{
      this.m_scale[0]=this.scale.x.value;
      this.markDirty();
    });
    this.scale.y.subscribe(()=>{
      this.m_scale[1]=this.scale.y.value;
      this.markDirty();
    });
    this.scale.z.subscribe(()=>{
      this.m_scale[2]=this.scale.z.value;
      this.markDirty();
    });
  }

  private markDirty(){
    this.m_localMatrixDirty=true;

    if(this.m_worldMatrixDirty)return;
    this.m_worldMatrixDirty=true;

    for(const child of this.m_children)child.markDirty();
  }

  private updateLocalMatrix(){
    if(!this.m_localMatrixDirty)return;

    const t=this.m_position;
    const s=this.m_scale;
    const r=this.m_rotation;

    const q=quat.create();
    quat.fromEuler(
      q,
      r[0]*180/Math.PI,
      r[1]*180/Math.PI,
      r[2]*180/Math.PI,
    );

    mat4.fromRotationTranslationScale(this.m_localMatrix,q,t,s);
    this.m_localMatrixDirty=false;
  }

  public get localMatrix(){
    this.updateLocalMatrix();
    return this.m_localMatrix;
  }

  public get worldMatrix(){
    if(!this.m_worldMatrixDirty)return this.m_worldMatrix;

    this.updateLocalMatrix();

    if(this.m_parent){
      mat4.multiply(
        this.m_worldMatrix,
        this.m_parent.worldMatrix,
        this.m_localMatrix,
      );
    }else{
      mat4.copy(this.m_worldMatrix,this.m_localMatrix);
    }

    this.m_worldMatrixDirty=false;
    return this.m_worldMatrix;
  }

  public get worldPosition():vec3{
    const m=this.worldMatrix;
    return vec3.fromValues(m[12],m[13],m[14]);
  }

  public get worldScale():vec3{
    const m=this.worldMatrix;
    const sx=vec3.length([m[0],m[1],m[2]]);
    const sy=vec3.length([m[4],m[5],m[6]]);
    const sz=vec3.length([m[8],m[9],m[10]]);
    return vec3.fromValues(sx,sy,sz);
  }

  public get worldRotation():quat{
    const m=this.worldMatrix;
    const scale=this.worldScale;

    const rotMat3=mat3.fromValues(
      m[0]/scale[0],m[1]/scale[0],m[2]/scale[0],
      m[4]/scale[1],m[5]/scale[1],m[6]/scale[1],
      m[8]/scale[2],m[9]/scale[2],m[10]/scale[2],
    );

    const q=quat.create();
    quat.fromMat3(q,rotMat3);
    quat.normalize(q,q);
    return q;
  }

  public add(child:Node):void{
    if(child.m_parent){
      console.warn('Node already has a parent');
      return;
    }

    this.m_children.push(child);
    child.m_parent=this;
    child.markDirty();
  }

  public remove(child:Node):void{
    const index=this.m_children.indexOf(child);
    if(index===-1){
      console.warn('Target node is not a child');
      return;
    }

    mat4.copy(child.m_localMatrix,child.m_worldMatrix);
    child.m_position=child.worldPosition;
    this.m_children.splice(index,1);
    child.m_parent=null;
    child.markDirty();
  }

  public detach():void{}

  public reset():void{}

  public clone():void{}

  public translate(dx:number,dy:number,dz:number):void{}

  public rotateX(rad:number):void{}

  public rotateY(rad:number):void{}

  public rotateZ(rad:number):void{}

  public scaleBy(sx:number,sy:number,sz:number):void{}
}
