import { Cabinet } from "entities";
import { CabinetSpecification } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetSetupCabinets = ResponseDataWithCount<Cabinet>;

function getSetupCabinets(query = ""): AsyncResponse<TGetSetupCabinets> {
  return api.get(`/defaultsetup/cabinets${query}`);
}

function createCabinet(payload: any): AsyncResponse<Cabinet> {
  return api.post("/cabinets", payload);
}

function createRoomCabinet(
  cabinetId: string,
  payload: string
): AsyncResponse<Cabinet> {
  return api.post(`/cabinets/${cabinetId}/rooms`, payload);
}

function getOneCabinet(cabinetId: string): AsyncResponse<Cabinet> {
  return api.get(`/cabinets/${cabinetId}`);
}

function updateCabinet(
  cabinetId: string,
  payload: { [x: number]: unknown }
): AsyncResponse<Cabinet> {
  return api.update(`/cabinets/${cabinetId}`, payload);
}

export type TGetCabinetByEntityData = ResponseDataWithCount<Cabinet>;

function getCabinetByEntity(
  entity: string,
  entityId: string
): AsyncResponse<TGetCabinetByEntityData> {
  return api.get(`/cabinets/${entity}/${entityId}`);
}

function getCabinetByRoom(
  roomId: string,
  query = ""
): AsyncResponse<TGetCabinetByEntityData> {
  return api.get(`/cabinets/rooms/${roomId}${query}`);
}

function getCabinetSpecification(
  spcificationId: string
): AsyncResponse<CabinetSpecification> {
  return api.get(`/cabinetspecifications/${spcificationId}`);
}

function getSpecificationByCabinet(
  cabinetId: string
): AsyncResponse<CabinetSpecification> {
  return api.get(`/cabinetspecifications/cabinets/${cabinetId}`);
}

function getDefaultCabinetSpecification(): AsyncResponse<CabinetSpecification> {
  return api.get(`/cabinetspecifications/`);
}

function updateCabinetSpecification(
  id: string,
  payload: undefined
): AsyncResponse<CabinetSpecification> {
  return api.update(`/cabinetspecifications/${id}`, payload);
}

function createCabinetSpecification(
  payload: unknown
): AsyncResponse<CabinetSpecification> {
  return api.post("/cabinetspecifications", payload);
}

function duplicateCabinetSetup(payload: {
  cabinetId: string;
}): AsyncResponse<Cabinet> {
  return api.post(`/cabinets/duplicate`, payload);
}

function deleteCabinetSetup(id: string): AsyncResponse<any> {
  return api.delete(`/cabinets/${id}`);
}

async function uploadCabinetImage(payload: FormData): AsyncResponse<any> {
  return api.post("/cabinets/upload", payload);
}

export {
  createRoomCabinet,
  getDefaultCabinetSpecification,
  getSpecificationByCabinet,
  getSetupCabinets,
  createCabinet,
  getOneCabinet,
  updateCabinet,
  getCabinetByEntity,
  getCabinetByRoom,
  uploadCabinetImage,
  getCabinetSpecification,
  updateCabinetSpecification,
  createCabinetSpecification,
  duplicateCabinetSetup,
  deleteCabinetSetup,
};
