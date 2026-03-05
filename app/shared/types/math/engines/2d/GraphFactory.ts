import type { Preset } from './types';

export class GraphFactory{
  public static create(svg:SVGSVGElement,preset:Preset):GraphAPI2D{
    const api=new GraphAPI2D();
    api.init(svg);

    switch(preset){
      case 'bare':
        break;
      case 'standard':
        api.registerRenderer('point',new PointRenderer(api.root));
        api.registerRenderer('vector',new VectorRenderer(api.root));
        api.registerRenderer('function',new FunctionRenderer(api.root));
        break;
    }

    return api;
  }
}
