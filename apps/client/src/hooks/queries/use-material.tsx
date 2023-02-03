import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";
import { LocationGenerics } from "router";
import { Material, WithCountDto } from "type-defs";

export const useMaterialQuery = (
  id: string,
  options?: UseQueryOptions<Material>
) =>
  useQuery<Material>(["materials", id], () => api.materials.getById(id), {
    ...options,
  });

export const useMaterialsQuery = (
  search: LocationGenerics["Search"],
  options?: UseQueryOptions<WithCountDto<Material>>
) =>
  useQuery<WithCountDto<Material>>(
    ["materials", search],
    () => api.materials.getAll(search),
    {
      ...options,
    }
  );

export const useMaterialTypesQuery = () => {
  return useQuery(["materials", "types"], () => api.materials.getTypes(), {
    staleTime: Infinity,
  });
};

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

export const useMaterialDeletion = (
  options?: UseMutationOptions<Material, unknown, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["materials:delete"], api.materials.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["materials"]);
    },
    ...options,
  });
};
