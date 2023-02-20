import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api, GrouppedFinishes } from "lib/api";

import { FinishProcess, WithCountDto } from "type-defs";

export const useFinishQuery = (
  id: number,
  options?: UseQueryOptions<FinishProcess>
) =>
  useQuery<FinishProcess>(["finishes", id], () => api.finishes.getById(id), {
    ...options,
  });

export const useFinishesQuery = (
  search?: Record<string, unknown>,
  options?: UseQueryOptions<WithCountDto<FinishProcess>>
) =>
  useQuery<WithCountDto<FinishProcess>>({
    queryKey: search ? ["finishes", search] : ["finishes"],
    queryFn: () => api.finishes.getAll(search),
    ...options,
  });

export const useFinishesGrouppedQuery = (
  search?: Record<string, unknown>,
  options?: UseQueryOptions<GrouppedFinishes>
) =>
  useQuery<GrouppedFinishes>({
    queryKey: search ? ["finishes", search] : ["finishes"],
    queryFn: async () => {
      const processes = await api.finishes.getAll(search);
      const paints = await api.finishes.getPaints(search);

      return { processes: processes.data, paints: paints.data };
    },
    ...options,
  });

// export const useMaterialsPaginated = ( search: Record<string, unknown>,
//   options?: UseQueryOptions<WithCountDto<Material>>
// ) =>
//   useQuery<WithCountDto<Material>>(
//     ["materials", search],
//     () => api.materials.getAll(search),
//     {
//       ...options,
//     }
//   );

// export const useMutateCabinet = (
//   id: string | number,
//   options?: UseMutationOptions<Cabinet, unknown, Cabinet>
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     ["cabinet", id],
//     (values: Partial<Cabinet>) => api.cabinets.updateById(id, values),
//     {
//       onSettled: () => {
//         queryClient.invalidateQueries(["cabinet", id]);
//       },
//       ...options,
//     }
//   );
// };

export const useFinishDeletion = (
  options?: UseMutationOptions<FinishProcess, unknown, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["finishes:delete"], api.finishes.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["finishes"]);
    },
    ...options,
  });
};
