import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Job } from "./job.entity";
import { User } from "./user.entity";

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
export class Markup extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column(() => MarkupFees)
  fees: MarkupFees;

  @Column(() => TaxOptions)
  taxes: TaxOptions;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;

  @OneToOne(() => Job, (job) => job.markup, {
    nullable: true,
    onDelete: "CASCADE",
  })
  job?: Job;

  @OneToOne(() => User, (user) => user.preferences.materialSet, {
    nullable: true,
    onDelete: "CASCADE",
  })
  defaultForUser?: User;
}
