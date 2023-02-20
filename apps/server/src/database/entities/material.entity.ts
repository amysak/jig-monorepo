import { Column, Entity, ManyToOne } from "typeorm";

import { type MaterialPurpose } from "type-defs";
import { AppBaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Vendor } from "./vendor.entity";

@Entity()
// @TableInheritance({
//   column: { type: "varchar", name: "purpose", enum: MATERIAL_PURPOSE },
// })
export class Material extends AppBaseEntity {
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

  @ManyToOne(() => Vendor, { onDelete: "CASCADE" })
  vendor: Vendor;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;
}
