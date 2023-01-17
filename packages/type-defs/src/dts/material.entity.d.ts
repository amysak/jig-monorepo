import { type MaterialPurpose } from "type-defs";
import { DefaultableBaseEntity } from "./base.entity";
import { Vendor } from "./vendor.entity";
export declare class Material extends DefaultableBaseEntity {
    id: number;
    purpose: MaterialPurpose;
    source: "in" | "out";
    name: string;
    type: string;
    description: string;
    set price(value: number);
    get price(): number;
    protected _price: number;
    discount?: number;
    wasteFactor?: number;
    laborCost?: number;
    isFinished: boolean;
    vendor: Vendor;
}
export declare class EdgebandingMaterial extends Material {
    lengthOfRoll: number;
    get price(): number;
}
//# sourceMappingURL=material.entity.d.ts.map