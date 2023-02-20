import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { ProfileSet } from "./profile.entity";
import { Upcharge } from "./upcharge.entity";
import { User } from "./user.entity";
import { Vendor } from "./vendor.entity";

class ModelInfo {
  @Column("text", { nullable: true })
  description: string;

  @Column("text", { nullable: true })
  image?: string;

  @Column("int", { default: 0 })
  price: number;

  @Column("int", { default: 0 })
  discount: number;

  @Column(() => ProfileSet)
  profiles: ProfileSet;
}

@Entity()
export class Model extends AppBaseEntity {
  @Column("text")
  name: string;

  // Groupped from material types
  @Column("text")
  materialType: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("text", { nullable: true })
  image?: string; // TODO: cloudinary ?

  @Column(() => ModelInfo)
  baseDoor: ModelInfo;

  @Column(() => ModelInfo)
  upperDoor: ModelInfo;

  @Column(() => ModelInfo)
  drawerFront: ModelInfo;

  @Column(() => ModelInfo)
  appliancePanel: ModelInfo;

  @Column(() => ModelInfo)
  wainscotPanel: ModelInfo;

  @Column(() => ModelInfo)
  endPanel: ModelInfo;

  @Column(() => ModelInfo)
  slabEnd: ModelInfo;

  @ManyToOne(() => Vendor, (vendor) => vendor.models, {
    nullable: false,
    onDelete: "CASCADE",
  })
  vendor: Vendor;

  @OneToMany(() => Upcharge, (upcharge) => upcharge.model, {
    cascade: true,
  })
  upcharges: Upcharge[];

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;
}
