import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";

import { CabinetOpening, WithCountDto } from "type-defs";

export const useOpeningsQuery = (
  search?: Record<string, unknown>,
  options?: UseQueryOptions<WithCountDto<CabinetOpening>>
) =>
  useQuery<WithCountDto<CabinetOpening>>({
    queryKey: search ? ["openings", search] : ["openings"],
    queryFn: () => api.openings.getAll(search),
    ...options,
  });

export const useModelsQuery = (options?: UseQueryOptions<string[]>) => {
  return useQuery<string[]>(["openings", "models"], api.openings.getModels, {
    ...options,
    // onSuccess: (data) => {
    //   queryClient.setQueryData(["models"], data);
    // },
  });
};

// export const useCabinetQuery = (
//   id: string,
//   options?: UseQueryOptions<CabinetOpening>
// ) =>
//   useQuery<CabinetOpening>(["cabinets", id], () => api.openings.getById(id), {
//     ...options,
// });

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

// type UseCabinetMutationInput = {
//   id: string | number;
//   values: Partial<Cabinet>;
// };

// export const useCabinetMutation = (
//   options?: UseMutationOptions<Cabinet, unknown, UseCabinetMutationInput>
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     ["cabinets:mutate"],
//     ({ id, values }: UseCabinetMutationInput) =>
//       api.cabinets.updateById(id, values),
//     {
//       onSettled: () => {
//         queryClient.invalidateQueries(["cabinets"]);
//       },
//       ...options,
//     }
//   );
// };

export const useOpeningDeletion = (
  options?: UseMutationOptions<CabinetOpening, unknown, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["openings:delete"], api.openings.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["openings"]);
    },
    ...options,
  });
};
