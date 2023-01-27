import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryResult } from "api";

export const useQueryCache = <T extends (...args: unknown[]) => unknown>(
  queryKey: QueryKey,
  queryFn: T
) => {
  let _data: QueryResult<T>;

  const {
    data: requestData,
    isInitialLoading,
    refetch,
  } = useQuery<unknown, unknown, QueryResult<T>>(queryKey, queryFn, {
    enabled: false,
  });

  const queryClient = useQueryClient();

  const [[, cacheData]] = queryClient.getQueriesData<QueryResult<T>>(queryKey);

  if (!cacheData) {
    console.log(`Refetching ${queryKey}`, cacheData);
    refetch();

    if (requestData) {
      _data = requestData;
    }
  } else {
    _data = cacheData;
  }

  // TODO
  // @ts-ignore
  return { data: _data, isLoading: isInitialLoading };
};
