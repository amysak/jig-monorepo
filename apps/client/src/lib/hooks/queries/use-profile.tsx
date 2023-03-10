import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";

import { Profile, WithCountDto } from "type-defs";

export const useProfilesQuery = (
  search?: Record<string, unknown>,
  options?: UseQueryOptions<WithCountDto<Profile>>
) =>
  useQuery<WithCountDto<Profile>>({
    queryKey: search ? ["profiles", search] : ["profiles"],
    queryFn: () => api.profiles.getAll(search),
    ...options,
  });

export const useProfileDeletion = (
  options?: UseMutationOptions<Profile, unknown, string | number>
) => {
  const queryClient = useQueryClient();

  return useMutation(["profiles:delete"], api.profiles.deleteById, {
    onSettled: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
    ...options,
  });
};
