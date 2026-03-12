import type { Camera2D } from "../../2d";
import type { Transform } from "../components";
import type { PolylineGeometry } from "../geometry";

export interface IRendererAdapter{
  draw(geometry:PolylineGeometry,transform:Transform,camera:Camera2D):void;
}
