import { Account, IActiveInActiveStatuses, IHardwareCategories, Room } from ".";

export interface AccessorySetup {
  id: string;
  is_default: boolean;
  category: IHardwareCategories;
  name: string;
  classification: AccessoryClassification;
  description: string;
  internal_note: string;
  image_url: string;
  status: IActiveInActiveStatuses;
  quantity: number;
  supplier_discount: number;
  installation_labor_cost: number;
  published_material_cost: number;
  shop_labor_cost: number;
  discounted_material_cost: number;
  show_on_reports: boolean;
  time: number;
  unit_of_measurement: string;
  surface_application: string;
  report: boolean;
  created_at: Date;
  updated_at: Date;
  room: Room;
  account: Account;
}
export interface AccessoryClassification {
  id: string;
  name: string;
  account: Account;
}
