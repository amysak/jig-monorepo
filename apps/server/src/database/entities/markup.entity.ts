import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";
import { AccountPreferences, JobPreferences } from "./preferences.entity";

class MarkupFees {
  @Column("real")
  design: number;

  @Column("boolean", { default: false })
  showDesignOnEstimate: boolean;

  @Column("real")
  salesCommission: number;

  @Column("real")
  profit: number;

  @Column("real")
  overhead: number;

  @Column("real", { default: 0 })
  additional?: number;

  @Column("real", { default: 0 })
  fixed?: number;
}

class TaxAppliance {
  @Column("boolean", { default: true })
  materials: boolean;

  @Column("boolean", { default: false })
  shopLabor: boolean;

  @Column("boolean", { default: false })
  installation: boolean;

  @Column("boolean", { default: false })
  delivery: boolean;
}

export class TaxOptions {
  @Column("real")
  salesTax: number;

  @Column("boolean", { default: false })
  showOnReports: boolean;

  @Column(() => TaxAppliance)
  appliedTo: TaxAppliance;
}

@Entity()
export class Markup extends DefaultableBaseEntity {
  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column(() => MarkupFees)
  fees: MarkupFees;

  @Column(() => TaxOptions)
  taxes: TaxOptions;

  @ManyToOne(() => Account, { onDelete: "CASCADE", nullable: true })
  account?: Account;

  @Column("integer", { nullable: true })
  accountId?: number;

  @OneToOne(() => AccountPreferences)
  accountPreferences?: AccountPreferences;

  @OneToOne(() => JobPreferences, { onDelete: "CASCADE" })
  jobPreferences?: JobPreferences;
}
