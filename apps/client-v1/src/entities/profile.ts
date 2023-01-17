import { Account, IActiveInActiveStatuses } from "./index";
import { Vendor } from "./vendor";
export interface Profile {
  id: string;
  name: string;
  is_default: boolean;
  category: string;
  image_url: string;
  vendor: Vendor;
  description: string;
  upcharge: number;
  status: IActiveInActiveStatuses;
  created_at: Date;
  updated_at: Date;
  account: Account;
}
