import { type TermsType } from "type-defs";
import { Account } from "./account.entity";
import { DefaultableBaseEntity } from "./base.entity";
import { AccountPreferences, JobPreferences } from "./preferences.entity";
declare class PaymentPart {
    percentage: number;
    explanationText: string;
}
declare class Conditions {
    proposal?: string;
    estimate?: string;
}
export declare class Terms extends DefaultableBaseEntity {
    type: TermsType;
    name: string;
    description?: string;
    delivered: boolean;
    installed: boolean;
    conditions: Conditions;
    account: Account;
    jobPreferences?: JobPreferences;
    accountPreferences?: AccountPreferences;
    text: string;
    populate(): void;
}
export declare class MultiPaymentTerms extends Terms {
    payments: PaymentPart[];
    populate(): void;
}
export declare class NetTerms extends Terms {
    paymentDue?: number;
    discountDue?: number;
    discountPercent?: number;
    adjustTotal: boolean;
    paymentDueDate?: Date;
    discountDueDate?: Date;
    populate(): void;
}
export {};
//# sourceMappingURL=terms.entity.d.ts.map