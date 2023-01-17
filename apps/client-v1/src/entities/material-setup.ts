import { Cabinet } from "./cabinet";
import { Door } from "./door";
import { Account, IActiveInActiveStatuses, ICabinetInterior } from "./index";
import { MaterialType } from "./material-type";
import { Vendor } from "./vendor";
export interface MaterialSetup {
  id: string;
  is_default: boolean;
  name: string;
  joint_type: string;
  vendor: Vendor;
  type: MaterialType;
  description: string;
  thickness: number;
  cost_per_drawer_box: CostPerDrawerBox;
  source: string;
  out_material_cost_per_sq_feet: number;
  waste_factor: number;
  supplier_discount: number;
  outsourced_cost: number;
  in_house_material_cost: number;
  in_house_labor_cost: number;
  in_discounted_cost: number;
  out_discounted_cost: number;
  length_of_roll: number;
  edgebanding_cost_per_roll: number;
  edgebanding_cost_per_foot: number;
  purpose: IMaterialPurpose;
  finish: ICabinetInterior;
  internal_note: string;
  status: IActiveInActiveStatuses;
  created_at: Date;
  updated_at: Date;
  doors: Door[];
  linear_inch_price_id: Door[];
  cabinet: Cabinet;
  account: Account;
}
export enum IMaterialPurpose {
  "DOOR" = "door",
  DRAWER_BOX = "drawer box",
  BACK = "back",
  INTERIOR_EXTERIOR = "interior/exterior",
  FINISHED_END = "finished end",
  FACE_FRAME = "face frame",
  EDGE_BANDING = "edge banding",
}
interface CostPerDrawerBox {
  "2_3": number;
  "3_4": number;
  "4_6": number;
  "6_8": number;
  "8_10": number;
  "10_12": number;
}
