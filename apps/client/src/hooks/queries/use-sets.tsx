import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "lib/api";
import { LocationGenerics } from "router";
import { ApiGetResult, MaterialSet, HardwareSet } from "type-defs";

export const useSetsQuery = (
  search: LocationGenerics["Search"],
  options: UseQueryOptions<any>
) => {
  const materialSetQuery = useQuery<ApiGetResult<MaterialSet>>({
    queryKey: ["material-set", search],
    queryFn: () => api.materialSets.getAll(search),
    ...options,
  });
  const hardwareSetQuery = useQuery<ApiGetResult<HardwareSet>>({
    queryKey: ["hardware-set", search],
    queryFn: () => api.hardwareSets.getAll(search),
    ...options,
  });

  return {
    materialSet: materialSetQuery.data,
    hardwareSet: hardwareSetQuery.data,
    isLoading: materialSetQuery.isLoading || hardwareSetQuery.isLoading,
    isError: materialSetQuery.isError || hardwareSetQuery.isError,
  };
};
