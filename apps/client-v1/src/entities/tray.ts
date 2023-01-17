import { Cabinet } from "./cabinet";
export interface TrayPart {
  id: string;
  front_height: number;
  back_height: number;
  side_height: number;
  bottom_depth: number;
  cabinet: Cabinet;
}
export interface FivePartTrayBox {
  id: string;
  front_height: number;
  back_height: number;
  bottom_depth: number;
  side_height: number;
  cabinet: Cabinet;
}
