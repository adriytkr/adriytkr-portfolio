import type { Animations, IGraphAPI } from '~/shared/types/math/engine/api';
import type { MathObject } from '../math-objects/bases';
import {Engine} from '~/shared/types/math/engine/Engine';
import type { BaseAnimation } from './animations/BaseAnimation';

export class GraphAPI implements IGraphAPI{
  private m_engine:Engine|null=null;

  public isReady=false;

  public init(svg:SVGSVGElement){
    this.m_engine=new Engine(svg);

    this.isReady=true;
  }

  public startAnimationLoop(){
    if(!this.m_engine)return;
    this.m_engine.startAnimationLoop();
  }

  public add(object:MathObject){
    if(!this.m_engine)return;
    this.m_engine.add(object);
  }

  public remove(object:MathObject){
    if(!this.m_engine)return;
    this.m_engine.remove(object);
  }

  public clear(){
    if(!this.m_engine)return;
    this.m_engine.clear();
  }

  public play(...animations:BaseAnimation[]):Promise<void[]>{
    if(!this.m_engine)return Promise.resolve([]);
    return this.m_engine.play(...animations);
  }

  public setActiveCamera(camera:CameraObject){
    if(!this.m_engine)return;
    this.m_engine.setActiveCamera(camera);
  }

  public get animate(){
    if(!this.m_engine)
      throw Error('Engine is unmounted');

    return this.m_engine.animate;
  }
}
