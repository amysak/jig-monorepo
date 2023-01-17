import { Accessory, Account } from "./index";
import { Job } from "./job";
import { Markup } from "./markup";
import { Material } from "./material";

export interface Room {
  id: string;
  reference_no: number;
  name: string;
  status: string;
  quantity: number;
  sort_order: number;
  installation_labor: IInstallationLabor;
  shop_labor: IShopLabor;
  drawer_labor: IDrawerLabor;
  accessory: Accessory;
  markup: Markup;
  job: Job;
  jobId: number;
  material: Material;
  account: Account;
  created_at: Date;
  updated_at: Date;
}

export interface IBoxLaborType {
  dovetail: number;
  rabbet: number;
  butt: number;
}
export interface IDrawerLabor {
  drawer_box: IBoxLaborType;
  tray_box: IBoxLaborType;
}
export interface IShopLabor {
  base: number;
  upper: number;
  tall: number;
  vanity: number;
  filler: number;
  toe_board: number;
  toe_platform: number;
  face_frame: number;
}
export interface IInstallationLabor {
  base: number;
  upper: number;
  tall: number;
  vanity: number;
  filler: number;
  toe_board: number;
  toe_platform: number;
  face_frame: number;
  applied_end: number;
  appliance_panel: number;
  wainscot_panel: number;
}
