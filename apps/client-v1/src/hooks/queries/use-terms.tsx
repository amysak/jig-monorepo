import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getAllTerms } from "api/terms";
import { Terms } from "entities";

export const useQueryTerms = (options?: UseQueryOptions<Terms[]>) =>
  useQuery<Terms[]>(["terms"], getAllTerms, {
    ...options,
  });
