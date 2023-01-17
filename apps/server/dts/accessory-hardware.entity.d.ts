import { BaseEntity } from "typeorm";
import { type AccessoryCategory, type HardwareCategory } from "type-defs";
import { Room } from "./room.entity";
declare abstract class AccessoryHardware extends BaseEntity {
    id: number;
    type: string;
    classification: string;
    name: string;
    description: string;
    materialCost: number;
    discount?: number;
    shopLaborCost: number;
    installationLaborCost: number;
    unitOfMeasurement: string;
    report: boolean;
}
export declare class Accessory extends AccessoryHardware {
    constructor();
    category: AccessoryCategory;
    room?: Room;
}
export declare class Hardware extends AccessoryHardware {
    constructor();
    category: HardwareCategory;
    room?: Room;
}
export {};
//# sourceMappingURL=accessory-hardware.entity.d.ts.map