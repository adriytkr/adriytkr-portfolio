import type { ClosedStyleOptions } from "../../types";
import { RegularPolygon } from "./RegularPolygon";

export interface TriangleOptions{
  radius:number;
}

export class Triangle extends RegularPolygon{
  public constructor(options:TriangleOptions,style:ClosedStyleOptions){
    super(
      {
        radius:options.radius,
        sides:3,
      },
      style,
    );
  }
}
