import { BaseEntity } from "typeorm";
import { Account } from "../entities";
export declare class Vendor extends BaseEntity {
    id: string;
    name: string;
    account: Account;
    readonly createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=vendor.entity.d.ts.map