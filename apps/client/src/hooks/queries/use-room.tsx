import { Room } from "type-defs";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "lib/api";

export const useQueryRooms = (
  jobId: string,
  options?: UseQueryOptions<Room[]>
) =>
  useQuery<Room[]>(["rooms"], () => api.rooms.getByJobId(jobId), {
    ...options,
  });

export const useQueryRoom = (id: string, options?: UseQueryOptions<Room>) =>
  useQuery<Room>(["rooms", id], () => api.rooms.getById(id), {
    ...options,
  });

export const useMutateRoom = (
  id: string | number,
  options?: UseMutationOptions<Room, unknown, Room>
) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["cabinet", id],
    (values: Partial<Room>) => api.rooms.updateById(id, values),
    {
      ...options,
      onSettled: (...onSettledProps) => {
        queryClient.invalidateQueries(["rooms", id]);
        if (options?.onSettled) {
          options.onSettled(...onSettledProps);
        }
      },
    }
  );
};

export const useCreateRoom = (jobId: string) => {
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
