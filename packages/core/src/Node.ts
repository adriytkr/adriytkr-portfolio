import { Signal } from './Signal';
import { mat4, vec3, quat, mat3 } from 'gl-matrix';

import { Hierarchy } from './Hierarchy';
import { Transform } from './Transform';

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

  private m_hierarchy:Hierarchy;
  private m_transform:Transform;

  public constructor(){
    this.m_hierarchy=new Hierarchy(this);
    this.m_transform=new Transform(this);

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

  public detach():void{
    if(this.m_parent===null)
      throw Error('This node has no parent to detach from');

    this.m_parent.remove(this);
  }

  public reset():void{
    this.resetPosition();
    this.resetRotation();
    this.resetScale();
  }

  public resetPosition(){
    this.position.x.value=0;
    this.position.y.value=0;
    this.position.z.value=0;
  }

  public resetRotation(){
    this.rotation.x.value=0;
    this.rotation.y.value=0;
    this.rotation.z.value=0;
  }

  public resetScale():void{
    this.scale.x.value=1;
    this.scale.y.value=1;
    this.scale.z.value=1;
  }

  public clone(deep=true):Node{
    const copy=new Node();

    const wm=this.worldMatrix;
    const pos=vec3.create();
    const rot=quat.create();
    const scl=vec3.create();
    mat4.getTranslation(pos,wm);
    mat4.getRotation(rot,wm);
    mat4.getScaling(scl,wm);

    copy.m_position=pos;
    copy.m_rotation=vec3.fromValues(rot[0],rot[1],rot[2]);
    copy.m_scale=scl;

    copy.position.x.value=pos[0];
    copy.position.y.value=pos[1];
    copy.position.z.value=pos[2];

    const euler=this.quatToEuler(rot);
    copy.rotation.x.value=euler[0];
    copy.rotation.y.value=euler[1];
    copy.rotation.z.value=euler[2];

    copy.scale.x.value=scl[0];
    copy.scale.y.value=scl[1];
    copy.scale.z.value=scl[2];

    copy.markDirty();

    if(deep){
      for(const child of this.m_children){
        const childCopy=child.clone(true);
        copy.add(childCopy);
      }
    }

    return copy;
  }

  private quatToEuler(q:quat):vec3{
    const x=q[0];
    const y=q[1];
    const z=q[2];
    const w=q[3];

    const sinr_cosp=2*(w*x+y*z);
    const cosr_cosp=1-2*(x**2+y**2);
    const roll=Math.atan2(sinr_cosp,cosr_cosp);

    const sinp=2*(w*y-z*x);
    let pitch;
    if(Math.abs(sinp)>=1)
      pitch=Math.sign(sinp)*Math.PI/2;
    else
      pitch=Math.asin(sinp);

    const siny_cosp=2*(w*z+x*y);
    const cosy_cosp=1-2*(y*y+z*z);
    const yaw=Math.atan2(siny_cosp,cosy_cosp);

    return vec3.fromValues(roll,pitch,yaw);
  }

  public translate(dx:number=0,dy:number=0,dz:number=0):void{
    this.position.x.value+=dx;
    this.position.x.value+=dy;
    this.position.x.value+=dz;
  }

  public scaleBy(sx:number,sy:number,sz:number):void{
    this.position.x.value*=sx;
    this.position.x.value*=sy;
    this.position.x.value*=sz;
  }
}
