import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { COMPLETION_STATUS, type CompletionStatus } from "../types";
import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";
import { Client } from "./client.entity";
import { JobPreferences } from "./preferences.entity";
import type { Room } from "./room.entity";

export class JobNotes {
  @Column("text", { nullable: true })
  internal?: string;

  @Column("text", { nullable: true })
  external?: string;
}

@Entity()
export class Job extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  estimateDate?: Date;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  proposalDate?: Date;

  @Column("text", { nullable: true })
  description?: string;

  @Column("text", { nullable: true })
  subdivision?: string;

  @Column("int", { nullable: true })
  lotNumber?: number;

  @Column(() => JobNotes)
  notes?: JobNotes;

  @ManyToOne(() => Client, (client) => client.jobs, {
    onDelete: "CASCADE",
  })
  client: Client;

  @Column("integer")
  clientId: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  account: Account;

  @Column("integer")
  accountId: number;

  @OneToMany("Room", "job", { nullable: true })
  rooms?: Room[];

  // TODO: onDelete: set do default
  @OneToOne(() => JobPreferences, (preferences) => preferences.job, {
    onDelete: "CASCADE",
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  preferences: JobPreferences;

  @Column("text", { default: COMPLETION_STATUS.ESTIMATE })
  status: CompletionStatus;

  @BeforeInsert()
  assignAccount() {
    this.account = this.client.account;

    if (this.preferences) this.preferences = new JobPreferences();
  }
}
