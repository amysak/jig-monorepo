import { BaseEntity } from "typeorm";
import { ProfileSet } from "./profile.entity";
import { Room } from "./room.entity";
declare class AppliedPart {
    model: string;
    profileSet: ProfileSet;
}
export declare class MaterialSet extends BaseEntity {
    id: number;
    name: string;
    door: AppliedPart;
    room: Room;
}
export {};
//# sourceMappingURL=material-set.entity.d.ts.map