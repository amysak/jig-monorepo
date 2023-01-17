import { Client } from "./client";
import { Account, ITaxType } from "./index";
import { Job } from "./job";
export interface Tax {
  id: string;
  is_default: boolean;
  sales_tax_rate: number;
  show_sales_tax_on_report: boolean;
  sales_tax_on_material: ITaxType;
  sales_tax_on_shop_labor: ITaxType;
  sales_tax_on_installation: ITaxType;
  sales_tax_on_delivery: ITaxType;
  tax_id_number: string;
  created_at: Date;
  updated_at: Date;
  job: Job;
  client: Client;
  account: Account;
}
