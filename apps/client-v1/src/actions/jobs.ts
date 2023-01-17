import { Job } from "entities";
import { ISerializedResponse } from "utilities/utils";

import { ActionTypes } from "./types";

const getJobsRequest = (query: string) => ({
  type: ActionTypes.GET_JOBS_REQUEST,
  query,
});

const getJobsSuccess = (jobs: ISerializedResponse<Job>) => ({
  type: ActionTypes.GET_JOBS_SUCCESS,
  jobs,
});

const getJobsFailure = (error: Error) => ({
  type: ActionTypes.GET_JOBS_FAILURE,
  error,
});

const getOneJobRequest = (jobId: string) => ({
  type: ActionTypes.GET_ONE_JOB_REQUEST,
  jobId,
});

const getOneJobSuccess = (job: Job) => ({
  type: ActionTypes.GET_ONE_JOB_SUCCESS,
  job,
});

const getOneJobFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_JOB_FAILURE,
  error,
});

const getClientJobsRequest = (clientId: string) => ({
  type: ActionTypes.GET_CLIENT_JOBS_REQUEST,
  clientId,
});

const getClientJobsSuccess = (jobs: ISerializedResponse<Job>) => ({
  type: ActionTypes.GET_CLIENT_JOBS_SUCCESS,
  jobs,
});

const getClientJobsFailure = (error: Error) => ({
  type: ActionTypes.GET_CLIENT_JOBS_FAILURE,
  error,
});

const createClientJobRequest = (payload: any) => ({
  type: ActionTypes.CREATE_CLIENT_JOB_REQUEST,
  payload,
});

const createClientJobSuccess = (job: Job) => ({
  type: ActionTypes.CREATE_CLIENT_JOB_SUCCESS,
  job,
});

const createClientJobFailure = (error: Error) => ({
  type: ActionTypes.CREATE_CLIENT_JOB_FAILURE,
  error,
});

const updateJobRequest = (jobId: string, payload: Partial<Job>) => ({
  type: ActionTypes.UPDATE_JOB_REQUEST,
  jobId,
  payload,
});

const updateJobSuccess = (job: Partial<Job>) => ({
  type: ActionTypes.UPDATE_JOB_SUCCESS,
  job,
});

const updateJobFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_JOB_FAILURE,
  error,
});

export {
  getJobsRequest,
  getJobsSuccess,
  getJobsFailure,
  getOneJobRequest,
  getOneJobSuccess,
  getOneJobFailure,
  getClientJobsRequest,
  getClientJobsSuccess,
  getClientJobsFailure,
  createClientJobRequest,
  createClientJobSuccess,
  createClientJobFailure,
  updateJobRequest,
  updateJobSuccess,
  updateJobFailure,
};
