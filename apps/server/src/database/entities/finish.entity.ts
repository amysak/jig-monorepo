import { Exclude, Expose } from "class-transformer";
import { PaintType } from "type-defs";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { AppBaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Paint extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("text")
  type: PaintType;

  @Column("text", { nullable: true })
  description?: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;
}

class PerPartPrice {
  @Column("real", { default: 0 })
  twoSidesCost: number;

  @Column("int", { default: 0 })
  discount: number;

  @Column("int", { default: 67 })
  simplePercent: number;
}

class PerSquareFeetPrice {
  @Column("real", { default: 0 })
  price: number;

  // %
  @Column("int", { default: 0 })
  discount: number;

  // ?
  // @Column("real", { nullable: true })
  // inHouseCost: number;
}

class FinishPrice {
  @Column(() => PerPartPrice)
  perPart: PerPartPrice;

  @Column(() => PerSquareFeetPrice)
  perSquareFeet: PerSquareFeetPrice;
}

@Entity()
export class FinishProcess extends AppBaseEntity {
  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @Column(() => FinishPrice)
  price: FinishPrice;

  @Expose()
  get discountedPricePerSqFt(): number {
    return (
      this.price.perSquareFeet.price *
      (1 - this.price.perSquareFeet.discount / 100)
    );
  }

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;
}

export class FinishSet {
  @ManyToOne(() => FinishProcess, { nullable: true })
  @JoinColumn({ name: "process_id" })
  process?: FinishProcess;

  @Column("int", { nullable: true })
  processId?: number;

  @ManyToOne(() => Paint, { nullable: true })
  @JoinColumn({ name: "glaze_id" })
  glaze?: Paint;

  @Column("int", { nullable: true })
  glazeId?: number;

  @ManyToOne(() => Paint, { nullable: true })
  @JoinColumn({ name: "paint_id" })
  paint?: Paint;

  @Column("int", { nullable: true })
  paintId?: number;
}
