import { World } from '@adriytkr/engine';
import type { ISystem } from '@adriytkr/engine';
import { AnimationGroup } from '../components';

export class AnimationSystem implements ISystem{
  public update(world:World,delta:number):void{
    const entities=world.query(AnimationGroup);

    for(const entity of entities){
      const animationGroup=world.getComponent(entity,AnimationGroup)!;

      for(let i=0;i<animationGroup.tracks.length;i++){
        const animation=animationGroup.tracks[i]!;
        animation.elapsed+=delta;
        const alpha=Math.min(animation.elapsed/animation.duration,1);

        animation.onUpdate(alpha);
        if(alpha>=1)animationGroup.tracks.splice(i,1);
      }
    }
  }
}
