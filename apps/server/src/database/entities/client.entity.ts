// @BeforeInsert
// fill preferences with creator accounts preferences

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { Account } from "./account.entity";
import { MailingAddress, PhysicalAddress } from "./address.entity";
import { AppBaseEntity } from "./base.entity";
import { Job } from "./job.entity";
import { ClientPreferences } from "./preferences.entity";

class ClientAddresses {
  @OneToOne(() => MailingAddress, { nullable: true })
  @JoinColumn()
  mailing?: MailingAddress;

  @OneToOne(() => PhysicalAddress, { nullable: true })
  @JoinColumn()
  physical?: PhysicalAddress;
}

@Entity()
export class Client extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  email?: string;

  @Column(() => ClientAddresses)
  addresses: ClientAddresses;

  @OneToMany(() => Job, (job) => job.client)
  jobs?: Job[];

  @ManyToOne(() => Account, (account) => account.clients, {
    onDelete: "CASCADE",
  })
  account: Account;

  @OneToOne(() => ClientPreferences)
  @JoinColumn()
  preferences: ClientPreferences;
}
