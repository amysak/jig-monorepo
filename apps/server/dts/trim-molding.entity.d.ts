import { BaseEntity } from "typeorm";
import { Room } from "./room.entity";
export declare class TrimMolding extends BaseEntity {
    id: number;
    description: string;
    subclassification: string;
    room?: Room;
}
export declare class Molding extends TrimMolding {
}
export declare class Trim extends TrimMolding {
}
//# sourceMappingURL=trim-molding.entity.d.ts.map