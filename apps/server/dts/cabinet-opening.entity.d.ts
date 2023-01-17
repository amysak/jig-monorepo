import { BaseEntity } from "typeorm";
import { Cabinet } from "./cabinet.entity";
import { ProfileSet } from "./profile.entity";
import { Vendor } from "./vendor.entity";
export declare class CabinetOpening extends BaseEntity {
    id: number;
    type: string;
    modelName: string;
    materialType: string;
    price: number;
    discount?: number;
    vendor: Vendor;
    cabinets?: Cabinet[];
}
export declare class Door extends CabinetOpening {
    defaultProfiles: ProfileSet;
}
export declare class DrawerFront extends CabinetOpening {
    defaultProfiles: ProfileSet;
}
export declare class DrawerBox extends CabinetOpening {
}
export declare class Tray extends CabinetOpening {
}
//# sourceMappingURL=cabinet-opening.entity.d.ts.map