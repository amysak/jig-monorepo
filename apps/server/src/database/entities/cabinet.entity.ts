import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  CABINET_BASE_TYPE,
  type CabinetBaseType,
  type CabinetCornerPlacement,
  type CabinetType,
} from "type-defs";

import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";
import { Accessory } from "./cabinet-equipment.entity";
import { CabinetSpecifications } from "./cabinet-specifications.entity";
import { Room } from "./room.entity";
import { Upcharge } from "./upcharge.entity";

// Cannot use STI (Single Table Inheritance) because TypeORM is a bad library:
// https://github.com/typeorm/typeorm/issues/9033
// https://github.com/typeorm/typeorm/issues/7558
// https://github.com/typeorm/typeorm/pull/9034
@Entity()
// @TableInheritance({
//   column: { type: "text", name: "type" },
// })
export class Cabinet extends DefaultableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  type: CabinetType;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  cornerPlacement: CabinetCornerPlacement;

  @Column("text", { default: CABINET_BASE_TYPE.STANDARD })
  baseType: CabinetBaseType;

  @Column("boolean")
  isInteriorFinished: boolean;

  @Column("boolean")
  isFramed: boolean;

  @Column("boolean", { default: false })
  favourite: boolean;

  @Column("boolean", { default: false })
  cornered: boolean;

  @OneToOne(
    () => CabinetSpecifications,
    (specifications) => specifications.cabinet,
    {
      onDelete: "CASCADE",
      nullable: false,
      eager: true,
      cascade: true,
    }
  )
  @JoinColumn()
  specifications: CabinetSpecifications;

  @ManyToOne(() => Account, (account) => account.cabinets, { nullable: false })
  account: Account;

  @ManyToOne(() => Room, (room) => room.cabinets, { nullable: true })
  room?: Room;

  // If room is present, then usually can have related parts, such as trims, accessory, etc.
  // Below is example of how to connect them
  @ManyToOne(() => Accessory, { nullable: true })
  accessories?: Accessory;

  @ManyToMany(() => Upcharge, { nullable: true })
  @JoinTable()
  upcharges?: Upcharge[];

  // Most likely has to be in some other table which holds room and cabinet
  // Data about parts that this cabinet needs by default is stored inside specifcations
  // Later we could also add other table that would represent customizations using existing cabinet
  // parts in system
  // TODO

  // @OneToMany(
  //   () => CabinetOpening,
  //   (cabinetOpening) => cabinetOpening.cabinets,
  //   { nullable: true }
  // )
  // cabinetOpenings?: CabinetOpening[];

  // @OneToMany(() => EndPanel, (endPanel) => endPanel.cabinet, {
  //   nullable: true,
  // })
  // endPanel?: EndPanel[];

  // @OneToMany(() => Filler, (filler) => filler.cabinet, {
  //   nullable: true,
  // })
  // fillers?: Filler[];
}

// @ChildEntity(CABINET_TYPE.BASE)
// export class BaseCabinet extends Cabinet {}

// @ChildEntity(CABINET_TYPE.UPPER)
// export class UpperCabinet extends Cabinet {}

// @ChildEntity(CABINET_TYPE.TALL)
// export class TallCabinet extends Cabinet {}

// @ChildEntity(CABINET_TYPE.VANITY)
// export class VanityCabinet extends Cabinet {}
