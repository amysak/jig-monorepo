import { BaseEntity } from "typeorm";
import { type CabinetType } from "type-defs";
import { Account } from "./account.entity";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";
export declare class Panel extends BaseEntity {
    id: number;
    type: string;
    height: number;
    panelsCount?: number;
    account?: Account;
    room?: Room;
}
export declare class AppliancePanel extends Panel {
    width: number;
}
export declare class EndPanel extends Panel {
    cabinetType: CabinetType;
    depth: number;
    cabinet: Cabinet;
}
export declare class WainscotPanel extends Panel {
}
//# sourceMappingURL=panel.entity.d.ts.map