import { Cabinet } from "./cabinet";
export interface DrawerPart {
  id: string;
  front_height: number;
  back_height: number;
  side_height: number;
  cabinet: Cabinet;
}
export interface FivePartDrawer {
  id: string;
  front_height: number;
  back_height: number;
  bottom_depth: number;
  side_height: number;
  cabinet: Cabinet;
}
