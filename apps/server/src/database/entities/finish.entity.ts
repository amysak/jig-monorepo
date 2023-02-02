import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { type FinishType } from "type-defs";

// Hopefully TypeORM fixes this soon: https://github.com/typeorm/typeorm/pull/9034
// And we could use STI. Until then, nullable: true
class PerPartPrice {
  @Column("real", { nullable: true })
  twoSidesCost: number;

  @Column("integer", { default: 100 })
  simplePercent: number;
}

class PerSquareFeetPrice {
  @Column("real", { nullable: true })
  twoSidesCost: number;

  @Column("integer", { default: 67 })
  simplePercent: number;

  @Column("real", { nullable: true })
  inHouseCost: number;
}

class FinishPrice {
  @Column(() => PerPartPrice)
  perPart: PerPartPrice;

  @Column(() => PerSquareFeetPrice)
  perSquareFeet: PerSquareFeetPrice;
}

@Entity()
// @TableInheritance({
//   column: { type: "text", name: "category", enum: FINISH_TYPE },
// })
export class Finish extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  type: FinishType;

  // Exists only if type is PROCESS
  @Column(() => FinishPrice)
  price?: FinishPrice;

  @Column("text")
  description: string;

  @Column("real", { nullable: true })
  discount?: number;
}

export class FinishSet {
  @ManyToOne(() => Finish, { nullable: true })
  process?: Finish;

  @ManyToOne(() => Finish, { nullable: true })
  glaze?: Finish;

  @ManyToOne(() => Finish, { nullable: true })
  paint?: Finish;
}

// @ChildEntity(FINISH_TYPE.PROCESS)
// export class FinishProcess extends Finish {
//   @Column(() => FinishPrice)
//   price: FinishPrice;
// }

// @ChildEntity(FINISH_TYPE.GLAZE)
// export class GlazeColors extends Finish {}

// @ChildEntity(FINISH_TYPE.PAINT)
// export class PaintColors extends Finish {}
