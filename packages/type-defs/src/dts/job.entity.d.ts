import { type CompletionStatus } from "type-defs";
import { Account } from "./account.entity";
import { AppBaseEntity } from "./base.entity";
import { Client } from "./client.entity";
import { JobPreferences } from "./preferences.entity";
import type { Room } from "./room.entity";
export declare class JobNotes {
    internal?: string;
    external?: string;
}
export declare class Job extends AppBaseEntity {
    name: string;
    estimateDate?: Date;
    proposalDate?: Date;
    description?: string;
    subdivision?: string;
    lotNumber?: number;
    notes?: JobNotes;
    client: Client;
    clientId: number;
    account: Account;
    accountId: number;
    rooms?: Room[];
    preferences: JobPreferences;
    status: CompletionStatus;
    assignAccount(): void;
}
//# sourceMappingURL=job.entity.d.ts.map