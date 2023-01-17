import { BaseEntity } from "typeorm";
import { Account } from "./account.entity";
import { AccountPreferences } from "./preferences.entity";
export declare class Letter extends BaseEntity {
    id: number;
    name: string;
    description?: string;
    body?: string;
    account: Account;
    accountPreferences?: AccountPreferences;
    readonly createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=letter.entity.d.ts.map