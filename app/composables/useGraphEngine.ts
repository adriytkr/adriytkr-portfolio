import { GraphAPI2D } from '@engines/2d/core/GraphAPI2D';

export default function(){
  const containerRef=ref<SVGSVGElement|null>(null);
  const api=shallowRef<GraphAPI2D|null>(null);

  onMounted(()=>{
    if(!containerRef.value)return;
    api.value=new GraphAPI2D();
    api.value.init(containerRef.value);
  });

  return{
    containerRef,
    api,
  };
}
