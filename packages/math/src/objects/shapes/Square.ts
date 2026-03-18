import type { ClosedStyleOptions } from "../../types";
import { RegularPolygon } from "./RegularPolygon";

export interface SquareOptions{
  radius:number;
}

export class Square extends RegularPolygon{
  public constructor(options:SquareOptions,style:ClosedStyleOptions){
    super(
      {
        radius:options.radius,
        sides:4,
      },
      style,
    );
  }
}
