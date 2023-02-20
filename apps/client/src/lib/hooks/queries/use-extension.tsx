import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "lib/api";

import { ApiGetResult, Panel, ToePlatform } from "type-defs";

export const useExtensionsCombinedQuery = (
  search: Record<string, unknown>,
  options: UseQueryOptions<any>
) => {
  const panelsQuery = useQuery<ApiGetResult<Panel>>({
    queryKey: ["panels", search],
    queryFn: () => api.panels.getAll(search),
    ...options,
  });
  const toesQuery = useQuery<ApiGetResult<ToePlatform>>({
    queryKey: ["toes", search],
    queryFn: () => api.toes.getAll(search),
    ...options,
  });

  return {
    panels: panelsQuery.data,
    toes: toesQuery.data,
    isLoading: panelsQuery.isLoading || toesQuery.isLoading,
    isError: panelsQuery.isError || toesQuery.isError,
  };
};
