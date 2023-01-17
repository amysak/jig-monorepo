import { Cabinet } from "./cabinet";
import { Account, IActiveInActiveStatuses } from "./index";
import { MaterialSetup } from "./material-setup";
import { MaterialType } from "./material-type";
import { Profile } from "./profile";
import { Vendor } from "./vendor";
export interface Door {
  id: string;
  material_type: MaterialType;
  name: string;
  vendor: Vendor;
  category: string;
  description: string;
  source: string;
  internal_note: string;
  image_url: string;
  outsourced_cost: number;
  suppliers_discount: number;
  discount_percentage: number;
  discount_cost: number;
  in_house_labor_cost: number;
  minimum_square_foot: number;
  under_mount_notching: Record<string, string>;
  bread_box_top_routing: Record<string, string>;
  breadboard_top_routing: Record<string, string>;
  hand_pull: Record<string, string>;
  hinge_drill: Record<string, string>;
  arch_top_bottom: Record<string, string>;
  minimum_cost: number;
  joint_type: string;
  additional_cost: Record<string, string>;
  assembly_cost: number;
  prefinished_cost: number;
  minimum_linear_inches: number;
  status: IActiveInActiveStatuses;
  created_at: Date;
  updated_at: Date;
  panel_profile: Profile;
  edge_profile: Profile;
  frame_profile: Profile;
  materials: MaterialSetup[];
  account: Account;
}
export interface DoorSpecificationPart {
  id: string;
  front_height: number;
  cabinet: Cabinet;
}
