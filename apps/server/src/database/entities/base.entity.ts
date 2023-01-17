import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class AppBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export abstract class DeactivatableEntity extends AppBaseEntity {
  @Column("boolean", { default: true })
  isActive: boolean;
}

export abstract class DefaultableBaseEntity extends DeactivatableEntity {
  @Column("boolean", { default: false })
  isDefault: boolean;
}
