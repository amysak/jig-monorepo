import { CabinetOpeningType } from "type-defs";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { MaterialType, Model } from "./model.entity";
import { Room } from "./room.entity";
import { Vendor } from "./vendor.entity";

@Entity({ name: "opening" })
// )))))))))))))))))))))))))))))))))
// @TableInheritance({
//   column: { type: "varchar", name: "type", enum: CABINET_OPENING_TYPE },
// })
export class CabinetOpening extends AppBaseEntity {
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
  @OneToOne(() => Model, (model) => model.opening)
  @JoinColumn()
  model: Model;

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

  @ManyToOne(() => Cabinet, { nullable: true })
  cabinet?: Cabinet;
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
