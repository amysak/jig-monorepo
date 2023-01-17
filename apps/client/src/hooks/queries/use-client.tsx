import { Client } from "type-defs";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "api";

export const useQueryClients = (options?: UseQueryOptions<Client[]>) =>
  useQuery<Client[]>(
    ["clients"],
    async () => {
      const { clients } = await api.clients.getAll();

      return clients;
    },
    {
      ...options,
    }
  );

type PaginatedClients = { clients: Client[]; count: number };

export const useQueryClientsPaginated = (
  query?: string,
  options?: UseQueryOptions<PaginatedClients>
) =>
  useQuery<PaginatedClients>(["clients"], () => api.clients.getAll(query), {
    ...options,
  });

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
