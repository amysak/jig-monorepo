import { TGetRoomsData } from "api/rooms";
import { Job } from "entities";
import { IFetchResponse } from "utilities/types";

export const ESTIMATE_PROPOSALS_SLICE_NAME = "ESTIMATE_PROPOSALS_SLICE_NAME";

export interface EstimateProposalsState {
  rooms: IFetchResponse<TGetRoomsData>;
  jobs: IFetchResponse<Job>;
}
