import { Account } from "./account";
import { Room } from "./room";

export interface LaborRate {
  id: string;
  name: string;
  amount: number;
  minimum_square_ft: number;
  dovetail_rate: number;
  rabbet_rate: number;
  butt_rate: number;
  is_default: boolean;
  unit_of_measure: string;
  category: string;
  type: string;
  internal_note: string;
  created_at: Date;
  updated_at: Date;
  room: Room;
  account: Account;
}
