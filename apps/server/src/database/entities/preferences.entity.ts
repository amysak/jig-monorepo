import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account } from "./account.entity";
import { CabinetSpecifications } from "./cabinet-specifications.entity";
import { Client } from "./client.entity";
import { HardwareSet } from "./hardware-set.entity";
import { Job } from "./job.entity";
import { Markup } from "./markup.entity";
import { MaterialSet } from "./material-set.entity";
import { MultiPaymentTerms, NetTerms, Terms } from "./terms.entity";

export abstract class Preferences extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Terms, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  terms?: MultiPaymentTerms | NetTerms;

  @ManyToOne(() => Markup, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  markup?: Markup;

  @ManyToOne(() => MaterialSet, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  materialSet?: MaterialSet;

  @ManyToOne(() => HardwareSet, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  hardwareSet?: HardwareSet;

  @ManyToOne(
    () => CabinetSpecifications,
    (specifications) => specifications.accountPreferences,
    {
      nullable: true,
      onDelete: "SET NULL",
      eager: true,
      cascade: true,
    }
  )
  @JoinColumn()
  cabinetSpecifications?: CabinetSpecifications[];

  @Column("text", { nullable: true })
  reportText?: string;

  @Column("boolean", { default: false })
  suspend: boolean;
}

@Entity()
export class AccountPreferences extends Preferences {
  @OneToOne(() => Account, (account) => account.preferences, {
    onDelete: "CASCADE",
  })
  account: Account;
}

@Entity()
export class ClientPreferences extends Preferences {
  @Exclude()
  override cabinetSpecifications?: CabinetSpecifications[];

  @OneToOne(() => Client, (client) => client.preferences, {
    onDelete: "CASCADE",
  })
  client: Client;
}

class JobDelivery {
  @Column("text", { nullable: true })
  text?: string;

  @Column("integer", { nullable: true })
  tripQuantity?: number;

  @Column("integer", { nullable: true })
  milesToJobSite?: number;

  @Column("real", { nullable: true })
  perTrip?: number;

  @Column("real", { nullable: true })
  perMile?: number;

  @Column("real", { nullable: true })
  perBox?: number;
}

@Entity()
export class JobPreferences extends Preferences {
  @Column(() => JobDelivery)
  delivery: JobDelivery;

  @Exclude()
  override materialSet?: MaterialSet;

  @Exclude()
  override hardwareSet?: MaterialSet;

  @OneToOne(() => Job, (job) => job.preferences, {
    onDelete: "CASCADE",
  })
  job: Job;
}
