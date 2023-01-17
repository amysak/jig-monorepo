import { BaseEntity } from "typeorm";
import { Cabinet } from "./cabinet.entity";
import { Room } from "./room.entity";
export declare class Toe extends BaseEntity {
    id: number;
    type: string;
    height: number;
    length: number;
    room?: Room;
    cabinet?: Cabinet;
}
export declare class ToeSkin extends Toe {
}
export declare class ToeBoard extends Toe {
}
export declare class ToePlatform extends Toe {
    thickness: number;
    sleepersCount: number;
    depth: number;
}
//# sourceMappingURL=toe.entity.d.ts.map