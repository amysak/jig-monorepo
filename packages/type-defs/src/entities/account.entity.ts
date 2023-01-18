import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ACCOUNT_ROLE, type AccountRole } from "../types";
import { Cabinet } from "./cabinet.entity";
import { Client } from "./client.entity";

import { Address } from "./address.entity";
import { Job } from "./job.entity";
import { AccountPreferences } from "./preferences.entity";

class AccountStripeInfo {
  @Column("text", { nullable: true })
  key?: string;
}

class AccountCompany {
  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  contactName?: string;

  @OneToMany(() => Address, (address) => address.account)
  addresses?: Address[];

  @Column("text", { nullable: true })
  logo?: string; // blob / link to storage
}

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text", { unique: true })
  email: string;

  @Exclude()
  @Column("text", { nullable: true })
  password?: string; // pw hash

  @Exclude()
  @Column("text", { nullable: true })
  salt?: string; // individually generated salt to match against when calling bcrypt.compare()

  @Column("text", { default: ACCOUNT_ROLE.SALES })
  role: AccountRole;

  @Exclude()
  @Column(() => AccountStripeInfo)
  stripe: AccountStripeInfo;

  @Column(() => AccountCompany)
  company: AccountCompany;

  @OneToOne(() => AccountPreferences, { onDelete: "SET NULL" })
  @JoinColumn()
  preferences: AccountPreferences;

  @OneToMany(() => Client, (client) => client.account)
  clients?: Client[];

  @OneToMany(() => Job, (job) => job.account)
  jobs?: Job[];

  @OneToMany(() => Cabinet, (cabinet) => cabinet.account)
  cabinets?: Cabinet[];

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // The solution below is an alternative to using @UseInterceptors(ClassSerializerInterceptor)
  // toJSON() {
  //   return instanceToPlain(this);
  // }
}
