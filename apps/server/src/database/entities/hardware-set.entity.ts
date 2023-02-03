import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";

import { Room } from "./room.entity";

@Entity()
export class HardwareSet extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Room, (room) => room.materialSet)
  room?: Room;

  @ManyToOne(() => Account)
  account: Account;
}
