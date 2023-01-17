import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";
import { AccountPreferences, JobPreferences } from "./preferences.entity";
declare class MarkupFees {
    design: number;
    showDesignOnEstimate: boolean;
    salesCommission: number;
    profit: number;
    overhead: number;
    additional?: number;
    fixed?: number;
}
declare class TaxAppliance {
    materials: boolean;
    shopLabor: boolean;
    installation: boolean;
    delivery: boolean;
}
export declare class TaxOptions {
    salesTax: number;
    showOnReports: boolean;
    appliedTo: TaxAppliance;
}
export declare class Markup extends DefaultableBaseEntity {
    name: string;
    description?: string;
    fees: MarkupFees;
    taxes: TaxOptions;
    account?: Account;
    accountId?: number;
    accountPreferences?: AccountPreferences;
    jobPreferences?: JobPreferences;
}
export {};
//# sourceMappingURL=markup.entity.d.ts.map