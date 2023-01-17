import { BaseEntity } from "typeorm";
import { type FinishType } from "type-defs";
declare class PerPartPrice {
    twoSidesCost: number;
    simplePercent: number;
}
declare class PerSquareFeetPrice {
    twoSidesCost: number;
    simplePercent: number;
    inHouseCost: number;
}
declare class FinishPrice {
    perPart: PerPartPrice;
    perSquareFeet: PerSquareFeetPrice;
}
export declare class Finish extends BaseEntity {
    id: number;
    category: FinishType;
    description: string;
    discount?: number;
}
export declare class FinishProcess extends Finish {
    price: FinishPrice;
}
export declare class GlazeColors extends Finish {
}
export declare class StainColors extends Finish {
}
export declare class PaintColors extends Finish {
}
export {};
//# sourceMappingURL=finish.entity.d.ts.map