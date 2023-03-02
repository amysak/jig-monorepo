import { Expose } from "class-transformer";
import { PanelType } from "type-defs";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";
import { User } from "./user.entity";

abstract class RoomExtension extends AppBaseEntity {
  @ManyToOne(() => Cabinet, { nullable: true })
  cabinet?: Cabinet;

  // TODO: consider removing
  @Column("text")
  name: string;

  @Column("real")
  width: number;

  @Column("real")
  height: number;

  // Used for specifying how many panels are used in a single panel object. All of them
  // are covered by upcharges separately.
  @Column("real", { nullable: true })
  singlePanelWidth?: number;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;
}

@Entity()
export class ToePlatform extends RoomExtension {
  @Column("real")
  depth: number;

  @Column("integer", { default: 2 })
  endsCount: number;

  @Column("integer", { default: 0 })
  sleepersCount: number;

  @ManyToOne(() => Room, (room) => room.toes, {
    nullable: true,
    onDelete: "CASCADE",
  })
  room?: Room;

  @OneToMany(() => Cabinet, (cabinet) => cabinet.toePlatform)
  cabinets?: Cabinet[];
}

@Entity()
export class Panel extends RoomExtension {
  @Column("text")
  type: PanelType;

  @Column("integer", { nullable: true })
  panelsCount?: number;

  @ManyToOne(() => Room, (room) => room.panels, {
    nullable: true,
    onDelete: "CASCADE",
  })
  room?: Room;
}
