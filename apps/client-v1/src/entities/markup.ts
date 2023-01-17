import { IAddSubtract } from ".";
import { Account } from "./account";
import { Client } from "./client";
import { Job } from "./job";

export interface Markup {
  id: string;
  is_default: boolean;
  name: string;
  description: string;
  sales_commission: number;
  design_engineer_fee: number;
  show_design_on_estimated_fee: boolean;
  overhead_markup: number;
  profit_markup: number;
  additional: number;
  additional_method: IAddSubtract;
  fixed_adjustment_amount: number;
  sales_tax_rate: number;
  show_sales_on_tax_report: string;
  show_sales_on_tax_material: string;
  show_sales_on_tax_labor: string;
  show_sales_on_tax_installation: string;
  show_sales_on_tax_delivery: string;
  reason: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  job: Job;
  client: Client;
  account: Account;
}
