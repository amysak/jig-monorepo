import { Job } from "type-defs";
import { client } from "../http";

// TODO: move to own interface file & merge when move to monorepo
export type PaginatedJobs = { jobs: Job[]; count: number };

export const getAll = (query = ""): Promise<PaginatedJobs> => {
  return client.get(`/jobs?${query}`);
};

export const getById = (jobId: string): Promise<Job> => {
  return client.get(`/jobs/${jobId}`);
};

export const create = (payload: Partial<Job>): Promise<Job> => {
  return client.post("/jobs", payload);
};

export const updateById = (
  jobId: string,
  payload: Partial<Job>
): Promise<Job> => {
  console.log("Updating job...");
  return client.update(`/jobs/${jobId}`, payload);
};

export const deleteById = (jobId: string): Promise<void> => {
  return client.delete(`/jobs/${jobId}`);
};

export const getClientJobs = (clientId: string): Promise<any> => {
  return client.get(`/jobs/clients/${clientId}`);
};