import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

import { MATERIAL_PURPOSE, type MaterialPurpose } from "../types";
import { DefaultableBaseEntity } from "./base.entity";
import { Vendor } from "./vendor.entity";

// Maybe needs to be split by material source (discountedPrice = price * (100 { - or + } discount) / 100)
// and create a getter for discounted price
@Entity()
@TableInheritance({
  column: { type: "varchar", name: "purpose", enum: MATERIAL_PURPOSE },
})
export class Material extends DefaultableBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  purpose: MaterialPurpose;

  @Column("text")
  source: "in" | "out";

  @Column("text")
  name: string;

  @Column("text")
  type: string;

  @Column("text")
  description: string;

  @Column("real")
  set price(value: number) {
    this._price = value;
  }
  get price() {
    return this._price;
  }
  protected _price: number;

  @Column("real")
  discount?: number;

  @Column("real")
  wasteFactor?: number;

  // used for in-house materials
  @Column("real")
  laborCost?: number;

  @Column("boolean")
  isFinished: boolean;

  @ManyToOne(() => Vendor)
  vendor: Vendor;
}

// price per foot is the actual one used in calculation
@ChildEntity(MATERIAL_PURPOSE.EDGEBANDING)
export class EdgebandingMaterial extends Material {
  @Column("integer")
  lengthOfRoll: number;

  override get price() {
    return this._price / this.lengthOfRoll;
  }
}
