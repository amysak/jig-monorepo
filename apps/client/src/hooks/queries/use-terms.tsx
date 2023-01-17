import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "api";
import { Terms } from "type-defs";

export const useQueryTerms = (options?: UseQueryOptions<Terms[]>) =>
  useQuery<Terms[]>(["terms"], api.terms.getAll, {
    ...options,
  });
