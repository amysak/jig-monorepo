import type { Job, ProtoExtends } from "type-defs";
import type { Dayjs } from "dayjs";

export type FormJob = ProtoExtends<
  Job,
  {
    estimateDate: Dayjs;
    proposalDate: Dayjs;
  }
>;
