import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";
import { LocationGenerics } from "router";
import { CabinetEquipment, WithCountDto } from "type-defs";

export const useEquipmentPaginated = (
  search: LocationGenerics["Search"],
  options?: UseQueryOptions<WithCountDto<CabinetEquipment>>
) =>
  useQuery<WithCountDto<CabinetEquipment>>(
    ["equipment", search],
    () => api.equipment.getAll(search),
    {
      ...options,
    }
  );

export const useEquipmentDeletion = (
  options?: UseMutationOptions<CabinetEquipment, unknown, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["equipment:delete"], api.equipment.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["equipment"]);
    },
    ...options,
  });
};
