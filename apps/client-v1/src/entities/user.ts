import { Account } from "./account";
export interface User {
  id: string;
  reference_no: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  salt: string;
  otp: string;
  priviledge: string;
  status: string;
  deletable: boolean;
  title: string;
  created_at: Date;
  updated_at: Date;
  account: Account;
}
export interface Preference {
  id: string;
  markup: any;
  term: any;
  material: any;
  hardware: any;
  delivery_text_for_report: string;
  suspend_automatic_recalculation: boolean;
  cabinet_base_style: string;
  check_exact_cabinet_width: boolean;
  number_of_box_parts: number;
  difference_between_cabinet_depth: number;
  in_house_manufacturing_labour: any;
  installation_labor: any;
  back_height: any;
  bottom_depth: any;
  front_height: any;
  side_height: any;
  account: Account;
}
