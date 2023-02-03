import {
  CabinetEquipmentCategory,
  FinishComplexity,
  FINISH_COMPLEXITY,
} from "type-defs";
import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";

import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";
import { Upcharge } from "./upcharge.entity";

@Entity()
export class CabinetEquipment extends DefaultableBaseEntity {
  // Same technique with groupping is used to give autocomplete on client. No constraint is really needed
  // if we only let user edit these types of fields in certain scopes.
  @Column("text")
  category: CabinetEquipmentCategory;

  // Same thing
  @Column("text")
  classification: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  description: string;

  // stored in %
  @Column("real", { nullable: true })
  discount?: number;

  @Column("real", { default: 0 })
  price: number;

  @AfterLoad()
  discountPrice() {
    const discountedPrice = this.discount
      ? this.price * ((100 - this.discount) / 100)
      : this.price;

    // TODO: requires number type but toFixed outputs string
    this.price = discountedPrice.toFixed(2) as unknown as number;
  }

  // TODO: enum
  @Column("text", { default: "unit" })
  measurement: string;

  @Column("boolean", { default: true })
  report: boolean;

  // This is for trims and moldings
  // Unfortunately, TypeORM does not allow single table inheritance if you want to use parent entity for manipulations
  // TypeORM does not allow manual type field insertion because of an open issue on github
  // Other than these 2 fields, accessory is identical to trims & moldings
  @Column("real", { default: 0 })
  wasteFactor: number;

  // This is for trims and moldings
  @Column("text", { default: FINISH_COMPLEXITY.NONE })
  finishComplexity: FinishComplexity;

  @ManyToMany(() => Upcharge, { nullable: true, cascade: true })
  @JoinTable()
  upcharges?: Upcharge[];

  @ManyToOne(() => Room, (room) => room.equipment, { nullable: true })
  room?: Room;

  @ManyToMany(() => Cabinet, { nullable: true })
  cabinets?: Cabinet[];

  @ManyToOne(() => Account, { nullable: true })
  account?: Account;
}

// TODO: PLEASE TYPEORM FIX YOUR BUGS

// All of them can generally be connected to a room, but usually all of below are tied to a cabinet
// Accessory most likely could be the one that is connected to a room most often
// Unlike in preferences and specifications case, this time ManyToMany is used because all of below
// cannot be modified for a certain room, because they are generally a ready product with some sizes,
// hence it doesn't really make much sense to make an individual copy per each.

// TODO: make use of DefaultableBaseEntity and isDefault
// @Entity()
// export class Accessory extends CabinetEquipment {
// }

// @Entity()
// export class Hardware extends CabinetEquipment {
//   // @ManyToOne(() => Room, (room) => room.accessories, { nullable: true })
//   // room?: Room;
//   // @ManyToMany(() => Room, (room) => room.accessories, { nullable: true })
//   // cabinets?: Cabinet;
//   // @ManyToOne(() => Account, { nullable: true })
//   // account?: Account;
// }

// @Entity()
// export class Trim extends CabinetEquipment {
//   @Column("real", { default: 0 })
//   wasteFactor: number;

//   @Column("text", { default: FINISH_COMPLEXITY.NONE })
//   finishComplexity: FinishComplexity;
//   // @ManyToOne(() => Room, (room) => room.accessories, { nullable: true })
//   // room?: Room;
//   // @ManyToMany(() => Room, (room) => room.accessories, { nullable: true })
//   // cabinets?: Cabinet;
//   // @ManyToOne(() => Account, { nullable: true })
//   // account?: Account;
// }

// @Entity()
// export class Molding extends CabinetEquipment {
//   @Column("real", { default: 0 })
//   wasteFactor: number;

//   @Column("text", { default: FINISH_COMPLEXITY.NONE })
//   finishComplexity: FinishComplexity;
//   // @ManyToOne(() => Room, (room) => room.accessories, { nullable: true })
//   // room?: Room;
//   // @ManyToMany(() => Room, (room) => room.accessories, { nullable: true })
//   // cabinets?: Cabinet;
//   // @ManyToOne(() => Account, { nullable: true })
//   // account?: Account;
// }
