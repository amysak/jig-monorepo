import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  ACCESSORY_HARDWARE_TYPE,
  type AccessoryCategory,
  type HardwareCategory,
} from "type-defs";
import { Room } from "./room.entity";

abstract class AccessoryHardware extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  type: string;

  @Column("text")
  classification: string;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @Column("real")
  materialCost: number;

  @Column("real", { nullable: true })
  discount?: number;

  @Column("real")
  shopLaborCost: number;

  @Column("real")
  installationLaborCost: number;

  @Column("text", { default: "each" })
  unitOfMeasurement: string;

  @Column("boolean", { default: true })
  report: boolean;
}

@Entity()
export class Accessory extends AccessoryHardware {
  constructor() {
    super();
    this.type = ACCESSORY_HARDWARE_TYPE.ACCESSORY;
  }

  @Column("text")
  category: AccessoryCategory;

  @ManyToOne(() => Room, (room) => room.accessories)
  room?: Room;
}

@Entity()
export class Hardware extends AccessoryHardware {
  constructor() {
    super();
    this.type = ACCESSORY_HARDWARE_TYPE.HARDWARE;
  }

  @Column("text")
  category: HardwareCategory;

  @ManyToOne(() => Room, (room) => room.accessories)
  room?: Room;
}
