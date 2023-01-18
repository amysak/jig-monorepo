import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

import { CABINET_OPENING_TYPE } from "../types";
import { Cabinet } from "./cabinet.entity";
import { ProfileSet } from "./profile.entity";
import { Vendor } from "./vendor.entity";

@Entity()
@TableInheritance({
  column: { type: "varchar", name: "type", enum: CABINET_OPENING_TYPE },
})
export class CabinetOpening extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  type: string;

  @Column("text")
  modelName: string;

  // TODO: define a way to manage this data
  @Column("text")
  materialType: string; // used to determine what material is applicable to this opening. matches "type" in material entity

  @Column("real")
  price: number;

  @Column("real")
  discount?: number;

  @ManyToOne(() => Vendor)
  vendor: Vendor;

  @ManyToMany(() => Cabinet, (cabinet) => cabinet.cabinetOpenings)
  cabinets?: Cabinet[];
}

@ChildEntity(CABINET_OPENING_TYPE.DOOR)
export class Door extends CabinetOpening {
  @Column(() => ProfileSet)
  defaultProfiles: ProfileSet;
}

@ChildEntity(CABINET_OPENING_TYPE.DRAWER_FRONT)
export class DrawerFront extends CabinetOpening {
  @Column(() => ProfileSet)
  defaultProfiles: ProfileSet;
}

@ChildEntity(CABINET_OPENING_TYPE.DRAWER_BOX)
export class DrawerBox extends CabinetOpening {}

@ChildEntity(CABINET_OPENING_TYPE.TRAY)
export class Tray extends CabinetOpening {}
