import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "api";
import { Cabinet, PaginationDto, WithCountDto } from "type-defs";

export const useCabinetsPaginated = (
  pagination: PaginationDto,
  options?: UseQueryOptions<WithCountDto<Cabinet>>
) =>
  useQuery<WithCountDto<Cabinet>>(
    ["cabinets", pagination],
    () => api.cabinets.getAll(pagination),
    {
      staleTime: 60000,
      ...options,
    }
  );
