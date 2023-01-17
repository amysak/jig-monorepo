import { Account, IActiveInActiveStatuses } from "./index";
import { Room } from "./room";
export interface Trim {
  id: string;
  is_default: boolean;
  classification: string;
  subclassification: string;
  name: string;
  description: string;
  unit_of_measure: string;
  internal_note: string;
  square_feet: number;
  standard_length: number;
  stabdard_length: string;
  material_cost: number;
  supplier_discount: number;
  waster_factor: number;
  shop_labor_cost: number;
  installation_labor_cost: number;
  trim_finish_type: string;
  number_of_finished_sides: number;
  show_on_reports: boolean;
  image_url: string;
  status: IActiveInActiveStatuses;
  created_at: Date;
  updated_at: Date;
  room: Room;
  account: Account;
}
