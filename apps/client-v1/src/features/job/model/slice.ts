import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import { JobsState, JOBS_SLICE_NAME } from "./types";

import { cloneDeep } from "lodash";
import {
  createJob,
  getClientJobs,
  getJob,
  updateJob,
  updateSubdivision,
} from "./thunk";

const initialJobTermsState: JobsState = {
  job: { data: undefined, isLoading: false },
  jobs: { data: undefined, isLoading: false },
};

export const jobTermsSlice = createSlice({
  name: JOBS_SLICE_NAME,
  initialState: initialJobTermsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJob.pending, (state) => {
      state.job.isLoading = true;
    });
    builder.addCase(getJob.fulfilled, (state, { payload }) => {
      state.job.isLoading = false;
      state.job.data = payload;
      state.job.error = undefined;
    });
    builder.addCase(getJob.rejected, (state) => {
      state.job.isLoading = false;
      state.job.error = "Error";
    });
    builder.addCase(getClientJobs.pending, (state) => {
      state.jobs.isLoading = true;
    });
    builder.addCase(getClientJobs.fulfilled, (state, { payload }) => {
      state.jobs.isLoading = false;
      state.jobs.data = payload;
      state.jobs.error = undefined;
    });
    builder.addCase(getClientJobs.rejected, (state) => {
      state.jobs.isLoading = false;
      state.jobs.error = "Error";
    });

    builder.addCase(createJob.pending, (state) => {
      state.job.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state, { payload }) => {
      state.job.isLoading = false;
      state.job.data = payload;
      state.jobs.data = {
        jobs: [...state.jobs.data[0]],
        count: state.jobs.data[1],
      };
      state.job.error = undefined;
    });
    builder.addCase(createJob.rejected, (state) => {
      state.job.isLoading = false;
      state.jobs.isLoading = false;
    });
    builder.addMatcher(isRejected(updateJob, updateSubdivision), (state) => {
      state.job.isLoading = false;
    });
    builder.addMatcher(
      isFulfilled(updateJob, updateSubdivision),
      (state, { meta }) => {
        state.job.isLoading = false;
        state.job.data = {
          ...cloneDeep(state.job.data),
          //@ts-ignore
          ...cloneDeep(meta.arg.payload),
        };
        state.job.error = undefined;
      }
    );
    builder.addMatcher(isPending(updateJob, updateSubdivision), (state) => {
      state.job.isLoading = true;
      state.job.error = undefined;
    });
  },
});
