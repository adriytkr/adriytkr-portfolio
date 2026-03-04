export default function(){
  const containerRef=ref<SVGSVGElement|null>(null);
  let api=new GraphAPI();

  onMounted(()=>{
    if(!containerRef.value)return;
    api.init(containerRef.value);
  });

  return{
    containerRef,
    api,
  };
}

// group math objects
// add lerp function
