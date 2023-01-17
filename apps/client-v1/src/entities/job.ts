import { Client } from "./client";
import {
  Account,
  Delivery,
  IClientPhysicalAddress,
  IJobStatuses,
} from "./index";
import { Markup } from "./markup";
import { Terms } from "./term";

export interface Job {
  id: number;
  reference_no: number;
  name: string;
  description: string;
  subdivision: string;
  estimateDate: Date;
  proposalDate: Date;
  lotNumber: string;
  physicalAddress: IClientPhysicalAddress;
  status: IJobStatuses;
  createdAt: Date;
  updatedAt: Date;
  notes: string;
  preferences: {
    terms: Terms;
    delivery: Delivery;
    markup: Markup;
    account: Account;
  };
  client: Client;
}
