import { IAccountBillingAddress, IAccountMailingAddress } from "./index";
import { Preference, User } from "./user";
export interface IAccountSubscription {
  id: string;
  current_period_start: number;
  current_period_end: number;
  customer: string;
  priceId: string;
  status: string;
  trial_start: number;
  trial_end: number;
}
export interface Account {
  id: string;
  reference_no: number;
  email: string;
  name: string;
  archived: boolean;
  contact_name: string;
  image_url: string;
  subscription: IAccountSubscription;
  stripe_customer_id: string;
  mailing_address: IAccountMailingAddress;
  physical_address: IAccountBillingAddress;
  created_at: Date;
  updated_at: Date;
  preference: Preference;
  owner: User;
}

export type AccountStats<
  DataType = {
    date: string;
    value: number;
  }
> = {
  total: string;
  selected: string;
  data?: DataType[];
};

export enum DashboardEntities {
  client = "client",
  job = "job",
  revenue = "revenue",
}
