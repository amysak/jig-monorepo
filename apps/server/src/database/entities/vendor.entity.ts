import { Column, Entity, ManyToOne } from "typeorm";

import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";

@Entity({ name: "vendor" })
export class Vendor extends AppBaseEntity {
  @Column("text")
  name: string;

  @ManyToOne(() => Account)
  account: Account;
}
