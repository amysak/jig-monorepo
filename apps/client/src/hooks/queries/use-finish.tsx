import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api, GrouppedFinishes } from "lib/api";
import { LocationGenerics } from "router";
import { Finish, WithCountDto } from "type-defs";

export const useFinishQuery = (id: string, options?: UseQueryOptions<Finish>) =>
  useQuery<Finish>(["finishes", id], () => api.finishes.getById(id), {
    ...options,
  });

export const useFinishesQuery = (
  search: LocationGenerics["Search"],
  options?: UseQueryOptions<WithCountDto<Finish>>
) =>
  useQuery<WithCountDto<Finish>>(
    ["finishes", search],
    () => api.finishes.getAll(search),
    {
      ...options,
    }
  );

export const useFinishesGrouppedQuery = (
  search: LocationGenerics["Search"],
  options?: UseQueryOptions<GrouppedFinishes>
) =>
  useQuery<GrouppedFinishes>(
    ["finishes", search],
    () => api.finishes.getGroupped(search),
    {
      ...options,
    }
  );

// export const useMaterialsPaginated = ( search: LocationGenerics["Search"],
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
  options?: UseMutationOptions<Finish, unknown, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["finishes:delete"], api.finishes.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["finishes"]);
    },
    ...options,
  });
};
