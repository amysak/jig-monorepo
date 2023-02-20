import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";
import { Equipment, WithCountDto } from "type-defs";

export const useEquipmentPaginated = (
  query: Record<string, unknown>,
  options?: UseQueryOptions<WithCountDto<Equipment>>
) =>
  useQuery<WithCountDto<Equipment>>(
    ["equipment", query],
    () => api.equipment.getAll(query),
    {
      ...options,
    }
  );

export const useEquipmentDeletion = (
  options?: UseMutationOptions<Equipment, unknown, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["equipment:delete"], api.equipment.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["equipment"]);
    },
    ...options,
  });
};
