import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiGetResult, Terms } from "type-defs";

import { api } from "lib/api";

export const useQueryTerms = (options?: UseQueryOptions<ApiGetResult<Terms>>) =>
  useQuery<ApiGetResult<Terms>>(["terms"], () => api.terms.getAll(), {
    ...options,
  });
