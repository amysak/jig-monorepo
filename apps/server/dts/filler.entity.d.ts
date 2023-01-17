import { BaseEntity } from "typeorm";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";
export declare class Filler extends BaseEntity {
    id: number;
    depth: number;
    cabinet?: Cabinet;
    room?: Room;
}
//# sourceMappingURL=filler.entity.d.ts.map