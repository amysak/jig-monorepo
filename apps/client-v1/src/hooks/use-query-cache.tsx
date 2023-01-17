import { QueryKey, useQuery } from "@tanstack/react-query";

import { QueryResult } from "api/Api";
import { queryClient } from "main";

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

  const [[, cacheData]] = queryClient.getQueriesData<QueryResult<T>>(queryKey);

  if (!cacheData) {
    console.log(`Refetching ${queryKey}`, cacheData);
    refetch();

    _data = requestData;
  } else {
    _data = cacheData;
  }

  return { data: _data, isLoading: isInitialLoading };
};
