import { Job, WithCountDto } from "type-defs";
import { client } from "../http";

// TODO: move to own interface file & merge when move to monorepo
export type PaginatedJobs = { jobs: Job[]; count: number };

export const getAll = (
  query?: Record<string, unknown>
): Promise<WithCountDto<Job>> => {
  return client.get(`/jobs?${client.getQueryString(query)}`);
};

export const getById = (jobId: number): Promise<Job> => {
  return client.get(`/jobs/${jobId}`);
};

export const create = (payload: Partial<Job>): Promise<Job> => {
  return client.post("/jobs", payload);
};

export const updateById = (
  jobId: number,
  payload: Partial<Job>
): Promise<Job> => {
  return client.update(`/jobs/${jobId}`, payload);
};

export const deleteById = (jobId: string): Promise<void> => {
  return client.delete(`/jobs/${jobId}`);
};

export const getClientJobs = (clientId: string): Promise<any> => {
  return client.get(`/jobs/clients/${clientId}`);
};
