import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  type CabinetBaseType,
  type CabinetCornerPlacement,
  type CabinetType,
} from "type-defs";

import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";
import { CabinetEquipment } from "./cabinet-equipment.entity";
import { Filler, Panel } from "./cabinet-extension.entity";
import { CabinetOpening } from "./cabinet-opening.entity";
import { CabinetSpecifications } from "./cabinet-specifications.entity";
import { MaterialSet } from "./material-set.entity";
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
export class Cabinet extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  type: CabinetType;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  cornerPlacement: CabinetCornerPlacement;

  @Column("text", { default: "standard" })
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
      cascade: true,
    }
  )
  @JoinColumn()
  specifications: CabinetSpecifications;

  @OneToMany(
    () => CabinetEquipment,
    (cabinetEquipment) => cabinetEquipment.cabinet,
    { nullable: true }
  )
  equipment?: CabinetEquipment;

  @OneToMany(() => CabinetOpening, (cabinetOpening) => cabinetOpening.cabinet, {
    nullable: true,
  })
  openings?: CabinetOpening[];

  @OneToMany(() => Panel, (panel) => panel.cabinet, {
    nullable: true,
  })
  panels?: Panel[];

  @OneToMany(() => Filler, (filler) => filler.cabinet, {
    nullable: true,
  })
  fillers?: Filler[];

  @OneToOne(() => MaterialSet, (materialSet) => materialSet.cabinet, {
    nullable: true,
  })
  materialSet?: MaterialSet;

  @ManyToMany(() => Upcharge, (upcharge) => upcharge.cabinets, { eager: true })
  @JoinTable()
  upcharges: Upcharge[];

  @ManyToOne(() => Room, (room) => room.cabinets, {
    nullable: true,
    onDelete: "CASCADE",
  })
  room?: Room;

  @ManyToOne(() => Account, (account) => account.cabinets, {
    onDelete: "CASCADE",
    nullable: false,
  })
  account: Account;
}

// @ChildEntity(CABINET_TYPE.BASE)
// export class BaseCabinet extends Cabinet {}

// @ChildEntity(CABINET_TYPE.UPPER)
// export class UpperCabinet extends Cabinet {}

// @ChildEntity(CABINET_TYPE.TALL)
// export class TallCabinet extends Cabinet {}

// @ChildEntity(CABINET_TYPE.VANITY)
// export class VanityCabinet extends Cabinet {}
