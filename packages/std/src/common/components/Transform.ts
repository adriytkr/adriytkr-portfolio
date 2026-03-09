import { Component } from '@adriytkr/engine';

export class Transform extends Component{
  public worldPosition={x:0,y:0,z:0};
  public localPosition={x:0,y:0,z:0};

  public localRotation = { x:0, y:0, z:0, w:1 };
  public worldRotation = { x:0, y:0, z:0, w:1 };

  public worldScale={x:1,y:1,z:1};
  public localScale={x:1,y:1,z:1};

  public constructor(){
    super();
  }
}
