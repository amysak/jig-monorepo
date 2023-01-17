import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

import { FINISH_TYPE, type FinishType } from "type-defs";

class PerPartPrice {
  @Column("real")
  twoSidesCost: number;

  @Column("integer", { default: 100 })
  simplePercent: number;
}

class PerSquareFeetPrice {
  @Column("real")
  twoSidesCost: number;

  @Column("integer", { default: 67 })
  simplePercent: number;

  @Column("real")
  inHouseCost: number;
}

class FinishPrice {
  @Column("text")
  perPart: PerPartPrice;

  @Column("text")
  perSquareFeet: PerSquareFeetPrice;
}

@Entity()
@TableInheritance({
  column: { type: "text", name: "category", enum: FINISH_TYPE },
})
export class Finish extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  category: FinishType;

  @Column("text")
  description: string;

  @Column("real", { nullable: true })
  discount?: number;
}

@ChildEntity(FINISH_TYPE.PROCESS)
export class FinishProcess extends Finish {
  @Column(() => FinishPrice)
  price: FinishPrice;
}

@ChildEntity(FINISH_TYPE.GLAZE)
export class GlazeColors extends Finish {}

@ChildEntity(FINISH_TYPE.STAIN)
export class StainColors extends Finish {}

@ChildEntity(FINISH_TYPE.PAINT)
export class PaintColors extends Finish {}
