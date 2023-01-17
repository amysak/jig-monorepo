import { Account } from "./account";

export interface Letter {
  id: string;
  is_default: boolean;
  name: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  account: Account;
}
