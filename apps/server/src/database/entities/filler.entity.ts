import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";

@Entity()
export class Filler extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("real")
  depth: number;

  @ManyToOne(() => Cabinet, (cabinet) => cabinet.fillers)
  cabinet?: Cabinet;

  @ManyToOne(() => Room, (room) => room.fillers)
  room?: Room;
}
