import { Component } from '@adriytkr/engine';
import type { BaseAnimation } from '../animations/BaseAnimation';

export class AnimationGroup extends Component{
  public constructor(public animations:BaseAnimation[]=[]){
    super();
  }
}
