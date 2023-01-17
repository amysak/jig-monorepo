import { Account } from "./account.entity";
import { MailingAddress, PhysicalAddress } from "./address.entity";
import { DeactivatableEntity } from "./base.entity";
import { Job } from "./job.entity";
import { ClientPreferences } from "./preferences.entity";
declare class ClientAddresses {
    mailing?: MailingAddress;
    physical?: PhysicalAddress;
}
export declare class Client extends DeactivatableEntity {
    name: string;
    email?: string;
    addresses: ClientAddresses;
    jobs?: Job[];
    account: Account;
    preferences: ClientPreferences;
}
export {};
//# sourceMappingURL=client.entity.d.ts.map