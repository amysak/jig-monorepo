import { BaseEntity } from "typeorm";
import { Account } from "./account.entity";
import { CabinetSpecifications } from "./cabinet-specifications.entity";
import { Client } from "./client.entity";
import { HardwareSet } from "./hardware-set.entity";
import { Job } from "./job.entity";
import { Markup } from "./markup.entity";
import { MaterialSet } from "./material-set.entity";
import { MultiPaymentTerms, NetTerms } from "./terms.entity";
export declare abstract class Preferences extends BaseEntity {
    id: number;
    terms?: MultiPaymentTerms | NetTerms;
    markup?: Markup;
    materialSet?: MaterialSet;
    hardwareSet?: HardwareSet;
    cabinetSpecifications?: CabinetSpecifications[];
    reportText?: string;
    suspend: boolean;
}
export declare class AccountPreferences extends Preferences {
    account: Account;
}
export declare class ClientPreferences extends Preferences {
    cabinetSpecifications?: CabinetSpecifications[];
    client: Client;
}
declare class JobDelivery {
    text?: string;
    tripQuantity?: number;
    milesToJobSite?: number;
    perTrip?: number;
    perMile?: number;
    perBox?: number;
}
export declare class JobPreferences extends Preferences {
    delivery: JobDelivery;
    materialSet?: MaterialSet;
    hardwareSet?: MaterialSet;
    job: Job;
}
export {};
//# sourceMappingURL=preferences.entity.d.ts.map