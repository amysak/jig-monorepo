import { DeepPartial, Room } from "type-defs";

import { client } from "../http";

export type TGetRoomsData = { count: number; rooms: Room[] };

export const getAll = (query = ""): Promise<TGetRoomsData> => {
  return client.get(`/rooms?${query}`);
};

export const getById = (roomId: number | string): Promise<Room> => {
  return client.get(`/rooms/${roomId}`);
};

export const getByJobId = (jobId: number | string): Promise<Room[]> => {
  return client.get(`/rooms/job/${jobId}`);
};

export const create = (payload: DeepPartial<Room>): Promise<Room> => {
  return client.post("/rooms", payload);
};

export const updateById = (
  id: number | string,
  payload: any
): Promise<Room> => {
  return client.update(`/rooms/${id}`, payload);
};

export const addCabinets = (
  roomId: number,
  cabinetIds: number[]
): Promise<TGetRoomsData> => {
  return client.update(`/rooms/${roomId}/cabinets`, { ids: cabinetIds });
};

export const deleteById = (id: number | string): Promise<unknown> => {
  return client.delete(`/rooms/${id}`);
};
