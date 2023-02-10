import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "lib/api";

import { ApiGetResult, Filler, Panel, ToePlatform } from "type-defs";

export const useExtensionsCombinedQuery = (
  search: Record<string, unknown>,
  options: UseQueryOptions<any>
) => {
  const panelsQuery = useQuery<ApiGetResult<Panel>>({
    queryKey: ["panels", search],
    queryFn: () => api.panels.getAll(search),
    ...options,
  });
  const fillersQuery = useQuery<ApiGetResult<Filler>>({
    queryKey: ["fillers", search],
    queryFn: () => api.fillers.getAll(search),
    ...options,
  });
  const toesQuery = useQuery<ApiGetResult<ToePlatform>>({
    queryKey: ["toes", search],
    queryFn: () => api.toes.getAll(search),
    ...options,
  });

  return {
    panels: panelsQuery.data,
    fillers: fillersQuery.data,
    toes: toesQuery.data,
    isLoading:
      panelsQuery.isLoading || fillersQuery.isLoading || toesQuery.isLoading,
    isError: panelsQuery.isError || fillersQuery.isError || toesQuery.isError,
  };
};
