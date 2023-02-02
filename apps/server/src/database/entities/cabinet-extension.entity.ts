import { PanelType } from "type-defs";
import { Column, Entity, ManyToOne } from "typeorm";

import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";

abstract class CabinetExtension extends DefaultableBaseEntity {
  @ManyToOne(() => Cabinet, { nullable: true })
  cabinet?: Cabinet;

  @Column("real", { default: 18 })
  depth: number;

  @Column("real", { default: 0 })
  height: number;

  @ManyToOne(() => Account, { eager: true })
  account: Account;
}

@Entity()
export class ToePlatform extends CabinetExtension {
  // Possible that type is not needed
  // Suppose, platform has to use skin, then skin length and height is calculated from platform

  // @Column("text")
  // type: ToeType

  @Column("integer", { default: 2 })
  endsCount: number;

  @Column("integer")
  sleepersCount: number;

  @Column("real", { default: 0 })
  minLength: number;

  @Column("real", { default: 0 })
  maxLength: number;

  // @ManyToOne(() => Room, (room) => room.toes, { nullable: true })
  // room?: Room;
}

@Entity()
export class Panel extends CabinetExtension {
  @Column("text")
  type: PanelType;

  @Column("real", { default: 0 })
  width: number;

  @Column("integer", { nullable: true })
  panelsCount?: number;

  // @ManyToOne(() => Room, (room) => room.panels, { nullable: true })
  // room?: Room;
}

@Entity()
export class Filler extends CabinetExtension {
  // @ManyToOne(() => Room, (room) => room.fillers, { nullable: true })
  // room?: Room;
}
