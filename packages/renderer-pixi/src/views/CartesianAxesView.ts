import type { CartesianAxes } from '@adriytkr/math';
import { View } from '../View';

export class CartesianAxesView extends View<CartesianAxes>{
  public constructor(model:CartesianAxes){
    super(model);
  }

  public override init():void{}

  public override redraw(): void {
    const g = this.graphics;
    const m = this.m_model;
    const zoom = this.context.camera.zoom$.value;

    const [xMin,xMax]=m.domain$.value;
    const [yMin,yMax]=m.range$.value;
    const step = m.step$.value;

    g.clear();
    g.setStrokeStyle({ color: 0xffffff, width: 2 });

    // 1. Draw X-Axis Line
    const xStart = this.project(xMin, 0);
    const xEnd = this.project(xMax, 0);
    g.moveTo(xStart.x, xStart.y);
    g.lineTo(xEnd.x, xEnd.y);

    // 2. Draw Y-Axis Line
    const yStart = this.project(0, yMin);
    const yEnd = this.project(0, yMax);
    g.moveTo(yStart.x, yStart.y);
    g.lineTo(yEnd.x, yEnd.y);
    g.stroke();

    // 3. Draw Ticks
    const tickSize = 5; // Fixed pixels
    g.setStrokeStyle({ color: 0xffffff, width: 1 });

    // X-Ticks
    for (let x = xMin; x <= xMax; x += step) {
      if (x === 0) continue; // Skip origin
      const p = this.project(x, 0);
      g.moveTo(p.x, p.y - tickSize);
      g.lineTo(p.x, p.y + tickSize);
    }

    // Y-Ticks
    for (let y = yMin; y <= yMax; y += step) {
      if (y === 0) continue;
      const p = this.project(0, y);
      g.moveTo(p.x - tickSize, p.y);
      g.lineTo(p.x + tickSize, p.y);
    }
    g.stroke();
  }
}
