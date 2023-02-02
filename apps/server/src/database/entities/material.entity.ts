import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { type MaterialPurpose } from "type-defs";
import { DefaultableBaseEntity } from "./base.entity";
import { Vendor } from "./vendor.entity";

// Maybe needs to be split by material source (discountedPrice = price * (100 { - or + } discount) / 100)
// and create a getter for discounted price
@Entity()
// @TableInheritance({
//   column: { type: "varchar", name: "purpose", enum: MATERIAL_PURPOSE },
// })
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

  // This is not marked private/protected because it causes issues with type-defs package
  // For example, in auth.service.ts:80
  @Column("real", { name: "price" })
  _price: number;
  set price(value: number) {
    this._price = value;
  }
  get price() {
    return this._price;
  }

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
// @ChildEntity(MATERIAL_PURPOSE.EDGEBANDING)
// export class EdgebandingMaterial extends Material {
//   @Column("integer")
//   lengthOfRoll: number;

//   override get price() {
//     return this._price / this.lengthOfRoll;
//   }
// }
