import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createJob as _createJob,
  getClientJobs as _getClientJobs,
  getJob as _getJob,
  TGetClientJobsData,
  updateJob as _updateJob,
} from "api/jobs";
import { Job } from "entities";

import { JOBS_SLICE_NAME } from "./types";

/* #region GET_JOB */
export const GET_JOB = "GET_JOB";

export const getJob = createAsyncThunk<Job, string>(
  `${JOBS_SLICE_NAME}/${GET_JOB}`,
  async (jobId) => _getJob(jobId)
);
/* #endregion */

/* #region GET_ALL_JOBS */
export const GET_JOBS = "GET_JOBS";

export const getClientJobs = createAsyncThunk<TGetClientJobsData, string>(
  `${JOBS_SLICE_NAME}/${GET_JOBS}`,
  async (clientId) => _getClientJobs(clientId)
);
/* #endregion */

/* #region CREATE_NEW_JOB */
export const CREATE_JOB = "CREATE_JOB";

export const createJob = createAsyncThunk<
  Job,
  {
    name: string;
    client: string;
  }
>(`${JOBS_SLICE_NAME}/${CREATE_JOB}`, async (payload) =>
  _createJob(payload as any)
);
/* #endregion */

/* #region UPDATE_JOB */
export const UPDATE_JOB = "UPDATE_JOB";

export const updateJob = createAsyncThunk<
  Job,
  {
    jobId: string;
    payload: { subdivision: any };
  }
>(`${JOBS_SLICE_NAME}/${UPDATE_JOB}`, async (payload) =>
  _updateJob(payload.jobId, payload.payload)
);
/* #endregion */

/* #region UPDATE_JOB_SUBDIVISION */
export const UPDATE_JOB_SUBDIVISION = "UPDATE_JOB_SUBDIVISION";

export const updateSubdivision = createAsyncThunk<
  Job,
  {
    jobId: string;
    payload: { subdivision: any };
  }
>(
  `${JOBS_SLICE_NAME}/${UPDATE_JOB_SUBDIVISION}`,
  async ({ jobId, payload: { subdivision } }) =>
    _updateJob(jobId, { subdivision })
);
/* #endregion */
