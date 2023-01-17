import { BaseEntity } from "typeorm";
import { type AccountRole } from "type-defs";
import { Cabinet } from "./cabinet.entity";
import { Client } from "./client.entity";
import { Address } from "./address.entity";
import { Job } from "./job.entity";
import { AccountPreferences } from "./preferences.entity";
declare class AccountStripeInfo {
    key?: string;
}
declare class AccountCompany {
    name: string;
    contactName?: string;
    addresses?: Address[];
    logo?: string;
}
export declare class Account extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password?: string;
    salt?: string;
    role: AccountRole;
    stripe: AccountStripeInfo;
    company: AccountCompany;
    preferences: AccountPreferences;
    clients?: Client[];
    jobs?: Job[];
    cabinets?: Cabinet[];
    readonly createdAt: Date;
    updatedAt: Date;
}
export {};
//# sourceMappingURL=account.entity.d.ts.map