import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";
import { Cabinet, DeepPartial, WithCountDto } from "type-defs";

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
  id: number,
  options?: UseQueryOptions<Cabinet>
) =>
  useQuery<Cabinet>(["cabinets", id], () => api.cabinets.getById(id), {
    ...options,
  });

// export const useCabinetsPaginated = (
//   search: Record<string, unknown>,
//   options?: UseQueryOptions<WithCountDto<Cabinet>>
// ) =>
//   useQuery<WithCountDto<Cabinet>>(
//     ["cabinets", search],
//     () => api.cabinets.getAll(search),
//     {
//       ...options,
//     }
//   );

export const useMutateCabinet = (
  id: number,
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
  id: number;
  values: DeepPartial<Cabinet>;
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
  options?: UseMutationOptions<Cabinet, unknown, number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["cabinets:delete"], api.cabinets.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["cabinets"]);
    },
    ...options,
  });
};
