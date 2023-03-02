import { type CompletionStatus } from "type-defs";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Equipment } from "./equipment.entity";
import { Cabinet } from "./cabinet.entity";
import { HardwareSet } from "./hardware-set.entity";
import { Job } from "./job.entity";
import { MaterialSet } from "./material-set.entity";
import { Panel, ToePlatform } from "./room-extension.entity";
import { Upcharge } from "./upcharge.entity";
import { User } from "./user.entity";

export class RoomDimensions {
  @Column("real", { nullable: true })
  toeKick?: number;

  @Column("real", { nullable: true })
  cabinetWidth?: number;

  // @Column("real", { nullable: true })
  // baseHeight?: number;
}

@Entity()
export class Room extends AppBaseEntity {
  // TODO: Can do AfterLoad calc.
  // @Expose()
  // totalPrice: number;

  @Column("text")
  name: string;

  @Column("text", { default: "estimate" })
  status: CompletionStatus;

  @Column(() => RoomDimensions)
  dimensions: RoomDimensions;

  @OneToMany(() => Cabinet, (cabinet) => cabinet.room, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  cabinets?: Cabinet[];

  @OneToMany(() => Equipment, (equipment) => equipment.room, {
    nullable: true,
    cascade: true,
    // TODO: think about eagers
    eager: true,
  })
  equipment?: Equipment[];

  @OneToMany(() => Panel, (panel) => panel.room, {
    cascade: true,
    eager: true,
  })
  panels: Panel[];

  // TODO: do we need this?
  @Column("jsonb", { default: [] })
  additionalFillers?: { width: number; height: number }[];

  @OneToMany(() => ToePlatform, (toe) => toe.room, {
    cascade: true,
    eager: true,
  })
  toes: ToePlatform[];

  @OneToMany(() => Upcharge, (upcharge) => upcharge.room, {
    cascade: true,
    eager: true,
  })
  upcharges: Upcharge[];

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

  @ManyToOne(() => Job, "rooms", {
    nullable: false,
    onDelete: "CASCADE",
  })
  job: Job;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;

  // https://github.com/typeorm/typeorm/issues/5493
  // Behold the great TypeORM library
  @BeforeInsert()
  noop() {
    return;
  }
}
