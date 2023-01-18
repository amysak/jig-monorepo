import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account } from "./account.entity";
import { Room } from "./room.entity";

// TODO: add split by category
@Entity()
export class LaborRate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  category: string;

  @Column("text")
  type: string;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @Column("text")
  unitOfMeasurement: string;

  @Column("real")
  amount: number;

  @ManyToMany(() => Room, (room) => room.laborRates, { nullable: true })
  rooms?: Room[];

  @ManyToOne(() => Account)
  account: Account;
}
