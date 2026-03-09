import { Component } from '@adriytkr/engine';

export class Transform extends Component{
  public worldPosition={x:0,y:0,z:0};
  public rotation={x:0,y:0,z:0,w:1};
  public scale={x:1,y:1,z:1};

  public localPosition={x:0,y:0,z:0};

  public constructor(){
    super();
  }
}
