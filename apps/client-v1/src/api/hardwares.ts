import { Accessory, AccessorySetup } from "entities";
import { Account } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetDefaultHardwaresData = ResponseDataWithCount<Accessory>;

function getDefaultHardwares(
  query = ""
): AsyncResponse<TGetDefaultHardwaresData> {
  return api.get(`/defaultsetup/hardwares${query}`);
}

function createHardware(payload: {
  is_default: boolean;
  status: any;
}): AsyncResponse<
  {
    account: Account;
    room: any;
  } & Accessory
> {
  return api.post("/hardwares", payload);
}

function updateHardware(
  hardwareId: any,
  payload: any
): AsyncResponse<Accessory> {
  return api.update(`/hardwares/${hardwareId}`, payload);
}

function getOneHardware(hardwareId: any): AsyncResponse<Accessory> {
  return api.get(`/hardwares/${hardwareId}`);
}

export type TGetSetupHardwareData = ResponseDataWithCount<AccessorySetup>;

function getSetupHardware(query = ""): AsyncResponse<TGetSetupHardwareData> {
  return api.get(`/defaultsetup/accessories${query}`);
}

function deleteHardware(id: string): AsyncResponse<any> {
  return api.delete(`/hardwares/${id}`);
}

function duplicateHardware(payload: { id: string }): AsyncResponse<Accessory> {
  return api.post("/hardwares/duplicate", payload);
}

function getRoomHardware(roomId: string): AsyncResponse<Accessory> {
  return api.get(`/hardwares/rooms/${roomId}`);
}

function createRoomHardware(payload: any): AsyncResponse<Accessory> {
  return api.post(`/hardwares/rooms`, payload);
}

function updateRoomHardware(
  roomId: string,
  payload: any
): AsyncResponse<Accessory> {
  return api.update(`/hardwares/rooms/${roomId}`, payload);
}

function deleteAllRoomHardwares(roomId: any): AsyncResponse<any> {
  return api.delete(`/hardwares/rooms/${roomId}`);
}

export {
  getDefaultHardwares,
  createHardware,
  getOneHardware,
  updateHardware,
  getSetupHardware,
  deleteHardware,
  duplicateHardware,
  getRoomHardware,
  createRoomHardware,
  updateRoomHardware,
  deleteAllRoomHardwares,
};
