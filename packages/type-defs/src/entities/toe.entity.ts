import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

import { TOE_TYPE } from "../types";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type", enum: TOE_TYPE } })
export class Toe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  type: string;

  @Column("real")
  height: number;

  @Column("real")
  length: number;

  @ManyToOne(() => Room, (room) => room.toes, { nullable: true })
  room?: Room;

  @ManyToOne(() => Cabinet)
  cabinet?: Cabinet;
}

@ChildEntity(TOE_TYPE.SKIN)
export class ToeSkin extends Toe {}

@ChildEntity(TOE_TYPE.BOARD)
export class ToeBoard extends Toe {}

@ChildEntity(TOE_TYPE.PLATFORM)
export class ToePlatform extends Toe {
  @Column("real")
  thickness: number;

  @Column("integer")
  sleepersCount: number;

  @Column("real")
  depth: number;
}
