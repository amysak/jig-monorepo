import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Room } from "./room.entity";
import { User } from "./user.entity";

@Entity()
export class HardwareSet extends AppBaseEntity {
  @Column("text")
  name: string;

  @OneToOne(() => Room, (room) => room.hardwareSet, {
    nullable: true,
    onDelete: "CASCADE",
  })
  room?: Room;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;
}
