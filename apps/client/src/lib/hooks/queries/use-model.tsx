import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";

import { Model } from "type-defs";

export const useModelsQuery = (options?: UseQueryOptions<Model[]>) =>
  useQuery({
    queryKey: ["models"],
    queryFn: api.models.getAll,
    ...options,
  });

export const useModelQuery = (id: number, options?: UseQueryOptions<Model>) =>
  useQuery({
    queryKey: ["models", id],
    queryFn: () => api.models.getById(id),
    ...options,
  });

export const useModelDeletion = (
  options?: UseMutationOptions<Model, unknown, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["models:delete"], api.models.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["models"]);
    },
    ...options,
  });
};
