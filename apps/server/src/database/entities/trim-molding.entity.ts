import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

import { Room } from "./room.entity";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class TrimMolding extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  description: string;

  @Column("text")
  subclassification: string;

  @ManyToOne(() => Room, (room) => room.moldings)
  room?: Room;
}

@ChildEntity()
export class Molding extends TrimMolding {}

@ChildEntity()
export class Trim extends TrimMolding {}
