import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";
import { Room } from "./room.entity";

@Entity()
export class HardwareSet extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @OneToOne(() => Room, (room) => room.hardwareSet, { onDelete: "CASCADE" })
  room?: Room;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  account: Account;
}
