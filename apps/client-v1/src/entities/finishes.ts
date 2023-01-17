import { Cabinet } from "./cabinet";
import { Account, IActiveInActiveStatuses } from "./index";
export interface Finishes {
  id: string;
  is_default: boolean;
  name: string;
  description: string;
  category: string;
  classification: string;
  internal_note: string;
  finishing_cost_two_sides: number;
  finishing_cost_per_side: number;
  supplier_discount: number;
  discounted_material_cost_per_square_feet: number;
  in_house_per_square_feet_cost: number;
  in_house_finishing_labor_cost: number;
  simple_percent_per_sqare_feet: number;
  simple_per_square_feet_labor_cost: number;
  outsourced_cost_per_parts_of_two_sides: number;
  simple_percent_per_part: number;
  status: IActiveInActiveStatuses;
  created_at: Date;
  updated_at: Date;
  cabinet: Cabinet;
  account: Account;
}
