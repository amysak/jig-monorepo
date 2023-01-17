import {
  Account,
  IActiveInActiveStatuses,
  IClientContact,
  IClientMailingAddress,
  IClientPhysicalAddress,
  IPreferredContact,
} from "./index";

import { Job } from "./job";
import { Markup } from "./markup";
import { Terms } from "./term";

export interface Client {
  id: string;
  reference_no: number;
  status: IActiveInActiveStatuses;
  type: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  mailing_address: IClientMailingAddress;
  physical_address: IClientPhysicalAddress;
  preferred_phone: string;
  phone: string;
  preferred_email: string;
  email: string;
  preferred_contact: IPreferredContact;
  first_contact: IClientContact;
  second_contact: IClientContact;
  markup: Markup;
  term: Terms;
  account: Account;
  jobs: Job;
}
