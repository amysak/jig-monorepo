import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { type MaterialPurpose } from "type-defs";
import { DefaultableBaseEntity } from "./base.entity";
import { Vendor } from "./vendor.entity";
import { Account } from "./account.entity";

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

  @Column("real")
  price: number;

  @Column("real", { default: 0 })
  discount: number;

  @Column("real", { default: 0 })
  wasteFactor: number;

  @Column("boolean", { default: false })
  isFinished: boolean;

  @ManyToOne(() => Vendor)
  vendor: Vendor;

  @ManyToOne(() => Account)
  account: Account;
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
