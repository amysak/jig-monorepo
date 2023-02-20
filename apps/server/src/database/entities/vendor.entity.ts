import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { Material } from "./material.entity";
import { Model } from "./model.entity";
import { User } from "./user.entity";

@Entity()
export class Vendor extends AppBaseEntity {
  @Column("text")
  name: string;

  @OneToMany(() => Material, (material) => material.vendor)
  materials: Material[];

  @OneToMany(() => Model, (model) => model.vendor)
  models: Model[];

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;
}
