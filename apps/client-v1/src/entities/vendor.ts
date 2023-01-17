import { Account } from "./index";
import { IMaterialPurpose } from "./material-setup";
export interface Vendor {
  id: string;
  name: string;
  finish: boolean;
  trim_classification: string[];
  accessory_category: string[];
  purpose: IMaterialPurpose[];
  trim: boolean;
  accessory: boolean;
  created_at: Date;
  updated_at: Date;
  account: Account;
}
