import { Room } from "type-defs";
import {
  useMutation,
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
