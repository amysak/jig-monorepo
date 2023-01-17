import { Account } from "./account";
import { MaterialSetup } from "./material-setup";

export interface LinearInchPrice {
  id: string;
  "2-3": number;
  "3.5-4": number;
  "4.5-6": number;
  "6.5-8": number;
  "8.5-10": number;
  "10.5-12": number;
  material: MaterialSetup;
  created_at: Date;
  updated_at: Date;
  account: Account;
}
