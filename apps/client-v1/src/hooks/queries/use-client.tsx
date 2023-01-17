import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { getClients, updateClient } from "api/clients";
import { Client } from "entities";

export const useQueryClients = (options?: UseQueryOptions<Client[]>) =>
  useQuery<Client[]>(
    ["clients"],
    async () => {
      const { clients } = await getClients();

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
  useQuery<PaginatedClients>(["clients"], () => getClients(query), {
    ...options,
  });

export const useMutateClient = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["client", id],
    (values: Partial<Client>) => updateClient(id, values),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["job", id]);
      },
    }
  );
};
