import { BaseEntity } from "typeorm";
import { type CabinetBaseType, type CabinetPlacement, type CabinetType } from "type-defs";
import { Account } from "./account.entity";
import { CabinetOpening } from "./cabinet-opening.entity";
import { CabinetSpecifications } from "./cabinet-specifications.entity";
import { Filler } from "./filler.entity";
import { EndPanel } from "./panel.entity";
import { Room } from "./room.entity";
export declare class Cabinet extends BaseEntity {
    id: number;
    type: CabinetType;
    get isFramed(): boolean;
    placement: CabinetPlacement;
    baseType: CabinetBaseType;
    specifications: CabinetSpecifications;
    cabinetOpenings?: CabinetOpening[];
    endPanel?: EndPanel[];
    fillers?: Filler[];
    account: Account;
    room?: Room;
}
export declare class BaseCabinet extends Cabinet {
}
export declare class UpperCabinet extends Cabinet {
}
export declare class TallCabinet extends Cabinet {
}
export declare class VanityCabinet extends Cabinet {
}
//# sourceMappingURL=cabinet.entity.d.ts.map