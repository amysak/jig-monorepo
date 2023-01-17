import { SpecificationRoot } from "./cabinetspecification";
import { DoorSpecificationPart } from "./door";
import { DrawerPart, FivePartDrawer } from "./drawer";
import { Job } from "./job";
import { Room } from "./room";
import { FivePartTrayBox, TrayPart } from "./tray";
export interface Cabinet extends SpecificationRoot {
  category: ICabinetCategory;
  base_style: ICabinetBaseStyle;
  include_top: boolean;
  favourite: boolean;
  status: string;
  cabinet_height: number;
  toe_kick_height: number;
  number_of_top_finished_sides: number;
  number_of_opennings: number;
  cabinet_depth: number;
  depth_difference_top: number;
  upper_doors: number;
  base_doors: number;
  number_of_drawers_boxes: number;
  number_of_drawer_fronts: number;
  number_of_rollout_trays: number;
  additional_material_cost: number;
  additional_installation_cost: number;
  additional_shop_labor: number;
  include_back: boolean;
  number_of_back_finished_sides: number;
  depth_top_back_stretcher: number;
  number_of_top_back_stretcher_finished_sides: number;
  nailer_height: number;
  nailer_quantity: number;
  number_of_nailer_finished_sides: number;
  subtract_nailer_from_back: boolean;
  depth_top_front_stretcher: number;
  number_of_top_front_stretcher_finished_sides: number;
  depth_stretcher_below_drawer: number;
  number_of_stretcher_below_drawer_finished_sides: number;
  number_of_adjusted_shelves: number;
  number_of_adjusted_shelves_finished_sides: number;
  depth_difference_adjusted_shelves: number;
  number_of_fixed_shelves: number;
  number_of_fixed_shelves_finished_sides: number;
  depth_difference_fixed_shelves: number;
  include_deck: boolean;
  number_of_deck_finished_sides: number;
  depth_difference_deck: number;
  number_of_cabinet_sides: number;
  number_of_cabinet_finished_sides: number;
  part_type: ICabinetType;
  panel_type: string;
  top_reveal: number;
  bottom_reveal: number;
  door_specification: DoorSpecificationPart[];
  drawer_part: DrawerPart[];
  five_part_drawer: FivePartDrawer[];
  tray_part: TrayPart[];
  five_part_tray_box: FivePartTrayBox[];
  face_frame: IFaceFrame;
  internal_note: string;
  room: Room;
  job: Job;
}
export enum ICabinetType {
  "BASE" = "base",
  "UPPER" = "upper",
  "TALL" = "tall",
  "VANITY" = "vanity",
}
export enum ICabinetCategory {
  BASE = "base",
  VANITY = "vanity",
  TALL = "tall",
  UPPER = "upper",
  FILLER = "filler",
  TOE_BOARD = "toe board",
  TOE_SKIN = "toe skin",
  TOE_PLATFORM = "toe platform",
  APPLIANCE_PANEL = "appliance panel",
  END_PANEL = "end panel",
  WAINSCOT_PANEL = "wainscot panel",
}
export enum ICabinetBaseStyle {
  STANDARD = "standard",
  ADJUSTABLE_LEGS = "adjustable legs",
  SEPARATE_BASE_PLATFORM = "separate base platform",
}
interface IFaceFrameProperty {
  number_of_finished_side: number;
  value: number;
}
interface IFaceFrame {
  top_rail_width: IFaceFrameProperty;
  center_rails: Array<IFaceFrameProperty>;
  bottom_rail_width: IFaceFrameProperty;
}
