import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "api";
import { LocationGenerics } from "router";
import { Cabinet, WithCountDto } from "type-defs";

export const useCachedCabinet = (id: string) => {
  const queryClient = useQueryClient();

  const matched = queryClient.getQueryCache().findAll(["cabinets"]);

  if (!matched.length) {
    return null;
  }

  const cabinets = (matched[0].state.data as WithCountDto<Cabinet>).data;

  return cabinets.find((cabinet) => cabinet.id.toString() === id);
};

export const useCabinetQuery = (
  id: string,
  options?: UseQueryOptions<Cabinet>
) =>
  useQuery<Cabinet>(["cabinets", id], () => api.cabinets.getById(id), {
    ...options,
  });

export const useCabinetsPaginated = (
  search: LocationGenerics["Search"],
  options?: UseQueryOptions<WithCountDto<Cabinet>>
) =>
  useQuery<WithCountDto<Cabinet>>(
    ["cabinets", search],
    () => api.cabinets.getAll(search),
    {
      ...options,
    }
  );

export const useMutateCabinet = (
  id: string | number,
  options?: UseMutationOptions<Cabinet, unknown, Cabinet>
) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["cabinet", id],
    (values: Partial<Cabinet>) => api.cabinets.updateById(id, values),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["cabinet", id]);
      },
      ...options,
    }
  );
};

type UseCabinetMutationInput = {
  id: string | number;
  values: Partial<Cabinet>;
};

export const useCabinetMutation = (
  options?: UseMutationOptions<Cabinet, unknown, UseCabinetMutationInput>
) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["cabinets:mutate"],
    ({ id, values }: UseCabinetMutationInput) =>
      api.cabinets.updateById(id, values),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["cabinets"]);
      },
      ...options,
    }
  );
};

export const useCabinetDeletion = (
  options?: UseMutationOptions<Cabinet, unknown, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["cabinets:delete"], api.cabinets.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["cabinets"]);
    },
    ...options,
  });
};
