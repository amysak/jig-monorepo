import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { AppBaseEntity } from "./base.entity";

@Entity()
export class MaterialType extends AppBaseEntity {
  @Column("text")
  name: string;

  @OneToMany(() => Model, (model) => model.materialType)
  models: Model[];
}

@Entity()
export class Model extends AppBaseEntity {
  @Column("text")
  name: string;

  @ManyToOne(() => MaterialType, (materialType) => materialType.models, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  materialType?: MaterialType;

  @OneToOne(() => MaterialType, (materialType) => materialType.models, {
    nullable: true,
    onDelete: "SET NULL",
  })
  opening?: MaterialType;
}
