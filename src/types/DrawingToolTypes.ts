import type { IconType } from "react-icons";
import { FaEraser, FaRegCircle } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import { TbLine } from "react-icons/tb";

export type ToolId =
  | "line"
  | "rectangle"
  | "circle"
  | "eraser";

export interface IDrawingTool {
  id: ToolId;
  name: string;
  icon: IconType;
}

export const tools: IDrawingTool[] = [
  {
    id: "line",
    name: "Line",
    icon: TbLine,
  },
  {
    id: "rectangle",
    name: "Rectangle",
    icon: LuRectangleHorizontal,
  },
  {
    id: "circle",
    name: "Circle",
    icon: FaRegCircle,
  },
  {
    id: "eraser",
    name: "Eraser",
    icon: FaEraser,
  },
];