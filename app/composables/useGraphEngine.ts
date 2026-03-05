import { GraphAPI2D } from '@math/engines/2d/GraphAPI2D';
import type { Preset } from '~/shared/types/math/engines/2d/types';

export default function(preset:Preset){
  const containerRef=ref<SVGSVGElement|null>(null);
  const api=shallowRef<GraphAPI2D|null>(null);

  onMounted(()=>{
    if(!containerRef.value)return;
    api.value=GraphFactory.create(containerRef.value,preset);
  });

  return{
    containerRef,
    api,
  };
}
