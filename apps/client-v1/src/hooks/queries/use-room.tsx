import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { createRoom, deleteRoom, getRoomsByJobId } from "api/rooms";
import { Room } from "entities";

export const useQueryRooms = (
  jobId: string,
  options?: UseQueryOptions<Room[]>
) =>
  useQuery<Room[]>(["rooms"], () => getRoomsByJobId(jobId), {
    ...options,
  });

export const useCreateRoom = (jobId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (values: Partial<Room>) => createRoom({ ...values, jobId: +jobId }),
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

  return useMutation((id: string) => deleteRoom(id), {
    onSettled: () => {
      queryClient.invalidateQueries(["rooms"]);
    },
  });
};
