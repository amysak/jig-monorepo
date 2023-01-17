import { BaseEntity } from "typeorm";
import { Account } from "./account.entity";
import { Room } from "./room.entity";
export declare class LaborRate extends BaseEntity {
    id: number;
    category: string;
    type: string;
    name: string;
    description: string;
    unitOfMeasurement: string;
    amount: number;
    rooms?: Room[];
    account: Account;
}
//# sourceMappingURL=labor-rate.entity.d.ts.map