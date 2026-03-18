import type { Vector } from '@adriytkr/math';
import { View } from '../View';

// renderer-pixi/VectorView.ts
export class VectorView extends View {
  private m_model:Vector;

  public constructor(model:Vector){
    super();
    this.m_model=model;
  }

  public init():void{}

  public override redraw(): void {
    const g = this.graphics;
    const m = this.m_model;
    const zoom = this.context.camera.zoom$.value;

    g.clear();

    g.setStrokeStyle({
      color:m.style.lineStroke$.value,
      width:m.style.lineStrokeWidth$.value,
    });

    // 1. Get Start and End in Screen Pixels
    const start=this.project(
      m.position.x$.value,
      m.position.y$.value
    );

    const end=this.project(
      m.position.x$.value+m.to$.value.x,
      m.position.y$.value+m.to$.value.y,
    );

    console.log(start,end);

    // 2. Draw the Main Line (The Shaft)
    g.moveTo(start.x, start.y);
    g.lineTo(end.x, end.y);
    g.stroke();
    g.fill();

    // 3. Draw the Arrowhead
    this.drawArrowHead(g,start,end,5*zoom);
  }

  private drawArrowHead(g,start,end,size){
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    
    g.beginPath();
    g.moveTo(end.x, end.y);
    // Calculate two points at 30-degree angles from the tip
    g.lineTo(
      end.x - size * Math.cos(angle - Math.PI / 6),
      end.y - size * Math.sin(angle - Math.PI / 6)
    );
    g.lineTo(
      end.x - size * Math.cos(angle + Math.PI / 6),
      end.y - size * Math.sin(angle + Math.PI / 6)
    );
    g.closePath();
    g.fill();
  }
}
