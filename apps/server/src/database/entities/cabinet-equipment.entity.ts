import { FinishComplexity, FINISH_COMPLEXITY } from "type-defs";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";

import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";

abstract class CabinetEquipment extends DefaultableBaseEntity {
  // Same technique with groupping is used to give autocomplete on client. No constraint is really needed
  // if we only let user edit these types of fields in certain scopes.
  @Column("text")
  category: string;

  // Same thing
  @Column("text")
  classification: string;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("real", { default: 0 })
  materialCost: number;

  @Column("real", { nullable: true })
  discount?: number;

  @Column("text", { default: "unit" })
  unitOfMeasurement: string;

  @Column("boolean", { default: true })
  report: boolean;
}

// All of them can generally be connected to a room, but usually all of below are tied to a cabinet
// Accessory most likely could be the one that is connected to a room most often
// Unlike in preferences and specifications case, this time ManyToMany is used because all of below
// cannot be modified for a certain room, because they are generally a ready product with some sizes,
// hence it doesn't really make much sense to make an individual copy per each.

// TODO: make use of DefaultableBaseEntity and isDefault
@Entity()
export class Accessory extends CabinetEquipment {
  @ManyToOne(() => Room, (room) => room.accessories, { nullable: true })
  room?: Room;

  @ManyToMany(() => Cabinet, { nullable: true })
  cabinets?: Cabinet[];

  @ManyToOne(() => Account, { nullable: true })
  account?: Account;
}

@Entity()
export class Hardware extends CabinetEquipment {
  // @ManyToOne(() => Room, (room) => room.accessories, { nullable: true })
  // room?: Room;
  // @ManyToMany(() => Room, (room) => room.accessories, { nullable: true })
  // cabinets?: Cabinet;
  // @ManyToOne(() => Account, { nullable: true })
  // account?: Account;
}

@Entity()
export class Trim extends CabinetEquipment {
  @Column("real", { default: 0 })
  wasteFactor: number;

  @Column("text", { default: FINISH_COMPLEXITY.NONE })
  finishComplexity: FinishComplexity;
  // @ManyToOne(() => Room, (room) => room.accessories, { nullable: true })
  // room?: Room;
  // @ManyToMany(() => Room, (room) => room.accessories, { nullable: true })
  // cabinets?: Cabinet;
  // @ManyToOne(() => Account, { nullable: true })
  // account?: Account;
}

@Entity()
export class Molding extends CabinetEquipment {
  @Column("real", { default: 0 })
  wasteFactor: number;

  @Column("text", { default: FINISH_COMPLEXITY.NONE })
  finishComplexity: FinishComplexity;
  // @ManyToOne(() => Room, (room) => room.accessories, { nullable: true })
  // room?: Room;
  // @ManyToMany(() => Room, (room) => room.accessories, { nullable: true })
  // cabinets?: Cabinet;
  // @ManyToOne(() => Account, { nullable: true })
  // account?: Account;
}
