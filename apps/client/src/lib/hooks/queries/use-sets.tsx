import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { ApiGetResult, DeepPartial, HardwareSet, MaterialSet } from "type-defs";

export const useSetsQuery = (search: Record<string, unknown>) => {
  const materialSetQuery = useQuery<ApiGetResult<MaterialSet>>({
    queryKey: ["material-sets", search],
    queryFn: () => api.materialSets.getAll(search),
  });
  const hardwareSetQuery = useQuery<ApiGetResult<HardwareSet>>({
    queryKey: ["hardware-sets", search],
    queryFn: () => api.hardwareSets.getAll(search),
  });

  return {
    materialSet: materialSetQuery.data,
    hardwareSet: hardwareSetQuery.data,
    isLoading: materialSetQuery.isLoading || hardwareSetQuery.isLoading,
    isError: materialSetQuery.isError || hardwareSetQuery.isError,
  };
};

// TODO: add zod validation for all hooks
// TODO: add zod validation for all hooks
// TODO: add zod validation for all hooks
// TODO: add zod validation for all hooks
// TODO: add zod validation for all hooks
export const useCreateMaterialSet = (
  options?: UseMutationOptions<MaterialSet, unknown, DeepPartial<MaterialSet>>
) =>
  useMutation(
    ["material-sets", "create"],
    (data) => api.materialSets.create(data),
    {
      ...options,
      onSettled: async (...args) => {
        await queryClient.invalidateQueries(["material-sets"]);
        if (options?.onSettled) {
          await options.onSettled(...args);
        }
      },
    }
  );

export const useMutateMaterialSet = (
  id: number,
  options?: UseMutationOptions<MaterialSet, unknown, MaterialSet>
) => {
  return useMutation({
    mutationKey: ["material-sets", id],
    mutationFn: (values: Partial<MaterialSet>) =>
      api.materialSets.updateById(id, values),
    onSettled: () => {
      queryClient.invalidateQueries(["material-sets", id]);
    },
    ...options,
  });
};

export const useMaterialSetsQuery = (
  options?: UseQueryOptions<ApiGetResult<MaterialSet>>
) =>
  useQuery<ApiGetResult<MaterialSet>>({
    queryKey: ["material-sets"],
    queryFn: () => api.materialSets.getAll(),
    ...options,
  });
