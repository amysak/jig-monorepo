import { AfterLoad, Column, Entity, ManyToOne } from "typeorm";

import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";

@Entity()
export class Upcharge extends DefaultableBaseEntity {
  // Ex. "Delivery", "Installation", "Shop Labor"
  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  description?: string;

  // Time is set in minutes
  @Column("int", { nullable: true })
  time?: number;

  // ^ If time is set then amount is defined by multiplying itself by the time,
  // because the user is prompted to only enter the time
  @Column("real")
  amount: number;

  @AfterLoad()
  calculateAmount() {
    this.amount = this.time
      ? this.account.preferences.ratePerMinute * this.time
      : this.amount;
  }

  @Column("boolean", { default: true })
  report: boolean;

  // Could be directly tied to a cabinet or other entity. If so, then we don't return them in findByAccountId.
  // Basically, need to check for the relationships
  @ManyToOne(() => Account, { eager: true })
  account: Account;
}
