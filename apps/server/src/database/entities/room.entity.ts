import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { type CompletionStatus, type RoomElevation } from "type-defs";
import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";
import { CabinetEquipment } from "./cabinet-equipment.entity";
import { HardwareSet } from "./hardware-set.entity";
import { Job } from "./job.entity";
import { MaterialSet } from "./material-set.entity";
import { Cabinet } from "./cabinet.entity";
import { Upcharge } from "./upcharge.entity";
import { Filler, Panel, ToePlatform } from "./cabinet-extension.entity";

// relations in this model are OneToMany because it is planned to create a separate related entity for each room
@Entity()
export class Room extends AppBaseEntity {
  @Column("real", { default: 0 })
  totalPrice: number;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  elevation?: RoomElevation;

  @OneToMany(() => Cabinet, (cabinet) => cabinet.room, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  cabinets?: Cabinet[];

  @OneToMany(() => CabinetEquipment, (equipment) => equipment.room, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  equipment?: CabinetEquipment[];

  // @OneToMany(() => Hardware, (hardware) => hardware.room)
  // hardware?: Hardware[];

  // @OneToMany(() => TrimMolding, (molding) => molding.room)
  // moldings?: TrimMolding[];

  @OneToMany(() => Panel, (panel) => panel.room, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  panels?: Panel[];

  @OneToMany(() => Filler, (filler) => filler.room, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  fillers?: Filler[];

  @OneToMany(() => ToePlatform, (toe) => toe.room, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  toes?: ToePlatform[];

  @ManyToMany(() => Upcharge, (upcharge) => upcharge.rooms, { eager: true })
  @JoinTable()
  upcharges?: Upcharge[];

  @OneToOne(() => MaterialSet, (materialSet) => materialSet.room, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  materialSet: MaterialSet;

  @OneToOne(() => HardwareSet, (hardwareSet) => hardwareSet.room, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  hardwareSet: HardwareSet;

  @Column("text", { default: "estimate" })
  status: CompletionStatus;

  @ManyToOne(() => Job, "rooms", {
    nullable: false,
    onDelete: "CASCADE",
  })
  job: Job;

  @ManyToOne(() => Account, "rooms", {
    nullable: false,
    onDelete: "CASCADE",
  })
  account: Account;

  // https://github.com/typeorm/typeorm/issues/5493
  // Behold the great TypeORM library
  @BeforeInsert()
  noop() {
    return;
  }
}
