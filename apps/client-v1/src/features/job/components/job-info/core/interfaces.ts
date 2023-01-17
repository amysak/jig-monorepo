import { Dayjs } from "dayjs";
import { Job } from "entities";
import { ProtoExtends } from "types";

export type FormJob = ProtoExtends<
  Job,
  {
    estimateDate: Dayjs;
    proposalDate: Dayjs;
  }
>;
