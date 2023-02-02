import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import {
  COMPLETION_STATUS,
  type CompletionStatus,
  type RoomElevation,
} from "type-defs";
import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";
import { CabinetEquipment } from "./cabinet-equipment.entity";
import { Cabinet } from "./cabinet.entity";
import { HardwareSet } from "./hardware-set.entity";
import { Job } from "./job.entity";
import { MaterialSet } from "./material-set.entity";

// relations in this model are OneToMany because it is planned to create a separate related entity for each room
@Entity()
export class Room extends AppBaseEntity {
  @Column("real", { default: 0 })
  totalPrice: number;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  elevation?: RoomElevation;

  @OneToMany(() => Cabinet, (cabinet) => cabinet.room)
  cabinets?: Cabinet[];

  @OneToMany(() => CabinetEquipment, (equipment) => equipment.room)
  equipment?: CabinetEquipment[];

  // @OneToMany(() => Panel, (panel) => panel.room)
  // panels?: Panel[];

  // @OneToMany(() => Hardware, (hardware) => hardware.room)
  // hardware?: Hardware[];

  // @OneToMany(() => TrimMolding, (molding) => molding.room)
  // moldings?: TrimMolding[];

  // @OneToMany(() => Filler, (filler) => filler.room)
  // fillers?: Filler[];

  // @OneToMany(() => ToePlatform , (toe) => toe.room)
  // toes?: ToePlatform [];

  // @OneToMany(() => LaborRate, (laborRate) => laborRate.rooms)
  // laborRates?: LaborRate[];

  @OneToOne(() => MaterialSet, (materialSet) => materialSet.room, {
    nullable: true,
  })
  @JoinColumn()
  materialSet?: MaterialSet;

  @OneToOne(() => HardwareSet, (hardwareSet) => hardwareSet.room, {
    nullable: true,
  })
  @JoinColumn()
  hardwareSet?: HardwareSet;

  @Column("text", { default: COMPLETION_STATUS.ESTIMATE })
  status: CompletionStatus;

  @ManyToOne(() => Job, "rooms", { onDelete: "CASCADE" })
  job: Job;

  @ManyToOne(() => Account, "rooms", { onDelete: "CASCADE" })
  account: Account;

  @BeforeInsert()
  assignAccount() {
    this.account = this.job.account;
  }
}
