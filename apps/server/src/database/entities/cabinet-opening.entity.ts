import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CabinetOpeningType } from "type-defs";

import { Vendor } from "./vendor.entity";
import { Account } from "./account.entity";
import { Room } from "./room.entity";
import { DefaultableBaseEntity } from "./base.entity";

@Entity({ name: "opening" })
// )))))))))))))))))))))))))))))))))
// @TableInheritance({
//   column: { type: "varchar", name: "type", enum: CABINET_OPENING_TYPE },
// })
export class CabinetOpening extends DefaultableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // If null - we use the model name by default. "name" is used to override the model name
  @Column("text", { nullable: true })
  name?: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("text")
  type: CabinetOpeningType;

  // TODO: on front-end, auto-complete (antd component) could use groupby query to find unique models
  @Column("text")
  model: string;

  // used to determine what material is applicable to this opening. matches "type" in material entity
  // TODO: auto-complete also uses groupby
  @Column("text")
  materialType: string;

  @Column("real")
  price: number;

  @Column("real", { default: 0 })
  discount: number;

  @Column("text", { nullable: true })
  imageUrl?: string;

  @ManyToOne(() => Vendor, { onDelete: "SET NULL" })
  vendor: Vendor;

  // If tied to an account - it's a default. Else - should be tied to room, then it's
  // determined by account rooms that it belongs to this account and it means that it
  // is allowed to edit
  @ManyToOne(() => Account, { nullable: true, onDelete: "CASCADE" })
  account?: Account;

  @ManyToOne(() => Room, { nullable: true, onDelete: "CASCADE" })
  room?: Room;
}

// @ChildEntity(CABINET_OPENING_TYPE.DOOR)
// export class Door extends CabinetOpening {
//   @Column(() => ProfileSet)
//   defaultProfiles: ProfileSet;
// }

// @ChildEntity(CABINET_OPENING_TYPE.DRAWER_FRONT)
// export class DrawerFront extends CabinetOpening {
//   @Column(() => ProfileSet)
//   defaultProfiles: ProfileSet;
// }

// @ChildEntity(CABINET_OPENING_TYPE.DRAWER_BOX)
// export class DrawerBox extends CabinetOpening {}

// @ChildEntity(CABINET_OPENING_TYPE.TRAY)
// export class Tray extends CabinetOpening {}
