import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { RecordStatus, RECORD_STATUS } from "type-defs";
import { Account } from "./account.entity";
import { AccountPreferences } from "./preferences.entity";

@Entity()
export class Letter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  description?: string;

  @Column("text")
  body?: string;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  account: Account;

  @OneToOne(
    () => AccountPreferences,
    (accountPreferences) => accountPreferences.terms
  )
  accountPreferences?: AccountPreferences;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
