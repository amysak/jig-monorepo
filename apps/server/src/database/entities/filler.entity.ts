import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class Filler extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("real")
  depth: number;

  @ManyToOne(() => Room, (room) => room.fillers)
  room?: Room;
}
