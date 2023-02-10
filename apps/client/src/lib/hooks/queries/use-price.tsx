import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "lib/api";

import { ApiGetResult, Markup, Terms, Upcharge } from "type-defs";

export const usePricesQuery = (
  search: Record<string, unknown>,
  options: UseQueryOptions<any>
) => {
  const markupsQuery = useQuery<ApiGetResult<Markup>>({
    queryKey: ["markups", search],
    queryFn: () => api.markups.getAll(search),
    ...options,
  });
  const termsQuery = useQuery<ApiGetResult<Terms>>({
    queryKey: ["terms", search],
    queryFn: () => api.terms.getAll(search),
    ...options,
  });
  const upchargesQuery = useQuery<ApiGetResult<Upcharge>>({
    queryKey: ["upcharges", search],
    queryFn: () => api.upcharges.getAll(search),
    ...options,
  });

  return {
    markups: markupsQuery.data,
    terms: termsQuery.data,
    upcharges: upchargesQuery.data,
    isLoading:
      markupsQuery.isLoading ||
      termsQuery.isLoading ||
      upchargesQuery.isLoading,
    isError:
      markupsQuery.isError || termsQuery.isError || upchargesQuery.isError,
  };
};
