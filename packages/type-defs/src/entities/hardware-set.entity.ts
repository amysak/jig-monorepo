import { BaseEntity, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Room } from "./room.entity";

@Entity()
export class HardwareSet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Room, (room) => room.materialSet)
  room?: Room;
}
