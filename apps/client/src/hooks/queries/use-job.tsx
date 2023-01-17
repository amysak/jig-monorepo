import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { merge } from "lodash-es";
import { Job } from "type-defs";

import { queryClient } from "app";
import { api } from "api";

export const invalidateJob = (id: string) =>
  queryClient.invalidateQueries(["job", id]);

export const useQueryJob = (id: string, options?: UseQueryOptions<Job>) =>
  useQuery<Job>(["job", id], () => api.jobs.getById(id), {
    staleTime: 60000,
    ...options,
  });

// optimistic update example
export const useMutateJob = (
  id: string,
  options?: UseMutationOptions<Job, unknown, Job>
) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["job", id],
    (values: Partial<Job>) => api.jobs.updateById(id, values),
    {
      onMutate: async (job) => {
        console.log("job => ", job);
        await queryClient.cancelQueries(["job", id]);

        const previousValue = queryClient.getQueryData(["job", id]);
        queryClient.setQueryData<Job>(["job", id], (old) => merge(old, job));
        return previousValue;
      },
      onError: (_, __, previousValue) =>
        queryClient.setQueryData(["job", id], previousValue),
      onSettled: () => {
        queryClient.invalidateQueries(["job", id]);
        // queryClient.invalidateQueries(["terms"]);
      },
      ...options,
    }
  );
};

export const useCreateJob = (options?: UseMutationOptions<Job, unknown, Job>) =>
  useMutation(["job:create"], (data: Partial<Job>) => api.jobs.create(data), {
    ...options,
  });