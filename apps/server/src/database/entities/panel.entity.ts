import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

import { PANEL_TYPE, type CabinetType } from "type-defs";
import { Account } from "./account.entity";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";

@Entity()
@TableInheritance({
  column: { type: "varchar", name: "type", enum: PANEL_TYPE },
})
export class Panel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  type: string;

  @Column("real")
  height: number;

  @Column("integer", { nullable: true })
  panelsCount?: number;

  @ManyToOne(() => Account)
  account?: Account;

  @ManyToOne(() => Room, (room) => room.panels)
  room?: Room;
}

@ChildEntity(PANEL_TYPE.APPLIANCE)
export class AppliancePanel extends Panel {
  @Column("real")
  width: number;
}

// Square feet = depth * height / 144
@ChildEntity(PANEL_TYPE.END)
export class EndPanel extends Panel {
  @Column("text")
  cabinetType: CabinetType;

  @Column("real")
  depth: number;

  @ManyToOne(() => Cabinet, (cabinet) => cabinet.endPanel)
  cabinet: Cabinet;
}

@ChildEntity(PANEL_TYPE.WAINSCOT)
export class WainscotPanel extends Panel {}
