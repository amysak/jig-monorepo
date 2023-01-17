import { createAsyncThunk } from "@reduxjs/toolkit";

import { getJob } from "api/jobs";
import { getRoomsByJobId, TGetRoomsData } from "api/rooms";
import { Job } from "entities";

import { ESTIMATE_PROPOSALS_SLICE_NAME } from "./types";

export const getInfoThunk = createAsyncThunk<[TGetRoomsData, Job], string>(
  `${ESTIMATE_PROPOSALS_SLICE_NAME}/getRooms`,
  async (jobId: string): Promise<[TGetRoomsData, Job]> => {
    return (await Promise.all([getRoomsByJobId(jobId), getJob(jobId)])) as any;
  }
);
