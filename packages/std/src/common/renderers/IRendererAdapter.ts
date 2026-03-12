import type { Camera2D } from "../../2d";
import type { Transform } from "../components";
import type { Geometry } from "../geometry";
import type { CommandBuffer } from "../systems/CommandBuffer";

export interface IRendererAdapter{
  // draw(geometry:Geometry,transform:Transform,camera:Camera2D):void;
  execute(buffer:CommandBuffer<any>,camera:Camera2D):void;
}
