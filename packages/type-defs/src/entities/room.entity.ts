import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  COMPLETION_STATUS,
  type CompletionStatus,
  type RoomElevation,
} from "../types";
import { Accessory, Hardware } from "./accessory-hardware.entity";
import { Account } from "./account.entity";
import { DeactivatableEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { Filler } from "./filler.entity";
import { HardwareSet } from "./hardware-set.entity";
import { Job } from "./job.entity";
import { LaborRate } from "./labor-rate.entity";
import { MaterialSet } from "./material-set.entity";
import { Panel } from "./panel.entity";
import { Toe } from "./toe.entity";
import { TrimMolding } from "./trim-molding.entity";

// relations in this model are OneToMany because it is planned to create a separate related entity for each room
@Entity()
export class Room extends DeactivatableEntity {
  @Column("real", { default: 0 })
  totalPrice: number;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  elevation?: RoomElevation;

  @OneToMany(() => Panel, (panel) => panel.room)
  panels?: Panel[];

  @OneToMany(() => Cabinet, (cabinet) => cabinet.room)
  cabinets?: Cabinet[];

  @OneToMany(() => Accessory, (accessory) => accessory.room)
  accessories?: Accessory[];

  @OneToMany(() => Hardware, (hardware) => hardware.room)
  hardware?: Hardware[];

  @OneToMany(() => TrimMolding, (molding) => molding.room)
  moldings?: TrimMolding[];

  @OneToMany(() => Filler, (filler) => filler.room)
  fillers?: Filler[];

  @OneToMany(() => Toe, (toe) => toe.room)
  toes?: Toe[];

  @OneToMany(() => LaborRate, (laborRate) => laborRate.rooms)
  laborRates?: LaborRate[];

  @OneToOne(() => MaterialSet, (materialSet) => materialSet.room)
  @JoinColumn()
  materialSet?: MaterialSet;

  @OneToOne(() => HardwareSet, (hardwareSet) => hardwareSet.room)
  @JoinColumn()
  hardwareSet?: HardwareSet;

  @Column("text", { default: COMPLETION_STATUS.ESTIMATE })
  status: CompletionStatus;

  @ManyToOne(() => Job, "rooms", { onDelete: "CASCADE" })
  job: Job;

  @Column("integer")
  jobId: number;

  @ManyToOne(() => Account, "rooms", { onDelete: "CASCADE" })
  account: Account;

  @BeforeInsert()
  assignAccount() {
    this.account = this.job.account;
  }
}
