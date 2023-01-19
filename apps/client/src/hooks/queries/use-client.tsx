import { Client, PaginationDto, WithCountDto } from "type-defs";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "api";

export const useClients = (options?: UseQueryOptions<Client[]>) =>
  useQuery<Client[]>(
    ["clients"],
    async () => {
      const { data } = await api.clients.getAll();

      return data;
    },
    {
      ...options,
    }
  );

export const useClientsPaginated = (
  query: PaginationDto,
  options?: UseQueryOptions<WithCountDto<Client>>
) =>
  useQuery<WithCountDto<Client>>(
    ["clients", query],
    () => api.clients.getAll(query),
    {
      ...options,
    }
  );

export const useMutateClient = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["client", id],
    (values: Partial<Client>) => api.clients.updateById(id, values),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["job", id]);
      },
    }
  );
};
