import { Account } from "entities";
import { Room } from "entities";
import { DeepPartial } from "types";
import { api, apiV2, AsyncResponse } from "./Api";

export type TGetRoomsData = { count: number; rooms: Room[] };

async function getRooms(query = ""): AsyncResponse<TGetRoomsData> {
  return apiV2.get(`/rooms?${query}`);
}

async function getRoom(roomId: string): AsyncResponse<Room> {
  return api.get(`/rooms/${roomId}`);
}

export type TGetJobRoomsData = TGetRoomsData;

async function getRoomsByJobId(jobId: string): Promise<Room[]> {
  return apiV2.get(`/rooms/job/${jobId}`);
}

async function createRoom(payload: DeepPartial<Room>): Promise<Room> {
  return apiV2.post("/rooms", payload);
}

async function updateRoom(id: string, payload: any): Promise<Room> {
  return apiV2.update(`/rooms/${id}`, payload);
}

async function deleteRoom(id: string): Promise<unknown> {
  return apiV2.delete(`/rooms/${id}`);
}

async function resetRoomLaborRate(
  roomId: string,
  category: string
): AsyncResponse<{ id: string; account: Account } & Room> {
  return api.update(`/rooms/${roomId}/labor-rates/${category}`);
}

export {
  getRooms,
  getRoom,
  getRoomsByJobId,
  createRoom,
  updateRoom,
  resetRoomLaborRate,
  deleteRoom,
};
