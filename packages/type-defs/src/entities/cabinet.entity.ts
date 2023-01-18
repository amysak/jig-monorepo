import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

import {
  CABINET_BASE_TYPE,
  CABINET_PLACEMENT,
  CABINET_TYPE,
  type CabinetBaseType,
  type CabinetPlacement,
  type CabinetType,
} from "../types";
import { Account } from "./account.entity";
import { CabinetOpening } from "./cabinet-opening.entity";
import { CabinetSpecifications } from "./cabinet-specifications.entity";
import { Filler } from "./filler.entity";
import { EndPanel } from "./panel.entity";
import { Room } from "./room.entity";

@Entity()
@TableInheritance({
  column: { type: "varchar", name: "type", enum: CABINET_TYPE },
})
export class Cabinet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: CABINET_TYPE.BASE })
  type: CabinetType;

  get isFramed(): boolean {
    return this.specifications.faceFrame.included;
  }

  @Column("text", { default: CABINET_PLACEMENT.DEFAULT })
  placement: CabinetPlacement;

  @Column("text", { default: CABINET_BASE_TYPE.STANDARD })
  baseType: CabinetBaseType;

  // @Column("text")
  // materialType: MaterialType; => Create enum

  @OneToOne(
    () => CabinetSpecifications,
    (specifications) => specifications.cabinet,
    { onDelete: "CASCADE", nullable: false }
  )
  @JoinColumn()
  specifications: CabinetSpecifications;

  @OneToMany(
    () => CabinetOpening,
    (cabinetOpening) => cabinetOpening.cabinets,
    { nullable: true }
  )
  cabinetOpenings?: CabinetOpening[];

  @OneToMany(() => EndPanel, (endPanel) => endPanel.cabinet, {
    nullable: true,
  })
  endPanel?: EndPanel[];

  @OneToMany(() => Filler, (filler) => filler.cabinet, {
    nullable: true,
  })
  fillers?: Filler[];

  @ManyToOne(() => Account, (account) => account.cabinets, { nullable: false })
  account: Account;

  @ManyToOne(() => Room, (room) => room.cabinets, { nullable: true })
  room?: Room;
}

@ChildEntity(CABINET_TYPE.BASE)
export class BaseCabinet extends Cabinet {}

@ChildEntity(CABINET_TYPE.UPPER)
export class UpperCabinet extends Cabinet {}

@ChildEntity(CABINET_TYPE.TALL)
export class TallCabinet extends Cabinet {}

@ChildEntity(CABINET_TYPE.VANITY)
export class VanityCabinet extends Cabinet {}
