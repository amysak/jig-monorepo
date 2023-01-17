import { Account } from "./index";
import { IMaterialPurpose } from "./material-setup";
export interface MaterialType {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  purpose: IMaterialPurpose[];
  account: Account;
}
