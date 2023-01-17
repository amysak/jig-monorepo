import { type CompletionStatus, type RoomElevation } from "type-defs";
import { Accessory, Hardware } from "./accessory-hardware.entity";
import { Account } from "./account.entity";
import { DeactivatableEntity } from "./base.entity";
import { Cabinet } from "./cabinet.entity";
import { Filler } from "./filler.entity";
import { HardwareSet } from "./hardware-set.entity";
import { Job } from "./job.entity";
import { LaborRate } from "./labor-rate.entity";
import { MaterialSet } from "./material-set.entity";
import { Panel } from "./panel.entity";
import { Toe } from "./toe.entity";
import { TrimMolding } from "./trim-molding.entity";
export declare class Room extends DeactivatableEntity {
    totalPrice: number;
    name: string;
    elevation?: RoomElevation;
    panels?: Panel[];
    cabinets?: Cabinet[];
    accessories?: Accessory[];
    hardware?: Hardware[];
    moldings?: TrimMolding[];
    fillers?: Filler[];
    toes?: Toe[];
    laborRates?: LaborRate[];
    materialSet?: MaterialSet;
    hardwareSet?: HardwareSet;
    status: CompletionStatus;
    job: Job;
    jobId: number;
    account: Account;
    assignAccount(): void;
}
//# sourceMappingURL=room.entity.d.ts.map