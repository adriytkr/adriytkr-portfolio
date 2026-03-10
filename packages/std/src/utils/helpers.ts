export function createRegularPolygonVertices(
  sides:number,
  radius:number,
){
  const vertices=[];

  for(let i=0;i<sides;i++){
    const angle=i*(2*Math.PI/sides)-Math.PI/2;

    vertices.push({
      x:radius*Math.cos(angle),
      y:radius*Math.sin(angle),
      z:0,
    });
  }

  return vertices;
}
