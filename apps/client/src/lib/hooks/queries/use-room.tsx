import { DeepPartial, Room } from "type-defs";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";

export const useQueryRooms = (
  jobId: number,
  options?: UseQueryOptions<Room[]>
) =>
  useQuery<Room[]>(["rooms"], () => api.rooms.getByJobId(jobId), {
    ...options,
  });

export const useQueryRoom = (id: number, options?: UseQueryOptions<Room>) =>
  useQuery<Room>(["rooms", id], () => api.rooms.getById(id), {
    ...options,
  });

export const useMutateRoom = (
  id: string | number,
  options?: UseMutationOptions<Room, unknown, DeepPartial<Room>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["rooms", id],
    mutationFn: (values) => api.rooms.updateById(id, values),
    onSettled: (...onSettledProps) => {
      queryClient.invalidateQueries(["rooms"]);
      if (options?.onSettled) {
        options.onSettled(...onSettledProps);
      }
    },
    ...options,
  });
};

export const useCreateRoom = (jobId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (values: Partial<Room>) =>
      api.rooms.create({ ...values, job: { id: +jobId } }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["job", +jobId]);
        queryClient.invalidateQueries(["rooms"]);
      },
    }
  );
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => api.rooms.deleteById(id), {
    onSettled: () => {
      queryClient.invalidateQueries(["rooms"]);
    },
  });
};
