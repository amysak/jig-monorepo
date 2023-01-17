import { Job } from "entities";
import { api, apiV2, AsyncResponse } from "./Api";

async function getJob(jobId: string): Promise<Job> {
  return apiV2.get(`/jobs/${jobId}`);
}

async function updateJobTerms(jobId: string, termsId: string): Promise<Job> {
  return apiV2.update(`jobs/${jobId}/terms/${termsId}`);
}

async function updateJobMarkup(jobId: string, markupId: string): Promise<Job> {
  return apiV2.update(`jobs/${jobId}/markup/${markupId}`);
}

// TODO: move to own interface file & merge when move to monorepo
export type TGetJobsData = { jobs: Job[]; count: number };

async function getJobs(query = ""): AsyncResponse<TGetJobsData> {
  return apiV2.get(`/jobs?${query}`);
}

async function createJob(payload: Partial<Job>): AsyncResponse<Job> {
  return apiV2.post("/jobs", payload);
}

async function updateJob(
  jobId: string,
  payload: Partial<Job>
): AsyncResponse<Job> {
  console.log("Updating job...");
  return apiV2.update(`/jobs/${jobId}`, payload);
}

async function deleteJob(jobId: string): AsyncResponse<any> {
  return api.delete(`/jobs/${jobId}`);
}

export type TGetClientJobsData = TGetJobsData;

async function getClientJobs(
  clientId: string
): AsyncResponse<TGetClientJobsData> {
  return api.get(`/jobs/clients/${clientId}`);
}

async function getSubdivisions(): AsyncResponse<any> {
  return api.get("/jobs/subdivisions");
}

export {
  getJob,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getClientJobs,
  getSubdivisions,
  updateJobTerms,
  updateJobMarkup,
};
