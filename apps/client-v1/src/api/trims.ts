import { Trim } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetTrimsData = ResponseDataWithCount<Trim>;

function getTrims(query = ""): AsyncResponse<TGetTrimsData> {
  return api.get(`/defaultsetup/trims${query}`);
}

export type TGetDefaultTrimsData = TGetTrimsData;

function getDefaultTrims(query = ""): AsyncResponse<TGetDefaultTrimsData> {
  return api.get(`/defaultsetup/trims${query}`);
}

function getOneTrimMolding(trimMoldingId: string): AsyncResponse<Trim> {
  return api.get(`/trimmoldings/${trimMoldingId}`);
}

function getTrimMoldingClassifications(): AsyncResponse<any> {
  return api.get("/trimmoldings/classifications");
}

function getTrimMoldingSublassifications(query: string): AsyncResponse<any> {
  return api.get(`/trimmoldings/subclassifications${query}`);
}

function updateTrimMolding(
  trimMoldingId: string,
  payload: { [x: number]: any; subclassification?: any }
): AsyncResponse<Trim> {
  return api.update(`/trimmoldings/${trimMoldingId}`, payload);
}

function createTrimMolding(payload: any): AsyncResponse<Trim> {
  return api.post("/trimmoldings", payload);
}

export type TGetRoomTrimsMoldingData = TGetDefaultTrimsData;

function getRoomTrimsMolding(
  roomId: string
): AsyncResponse<TGetRoomTrimsMoldingData> {
  return api.get(`/trimmoldings/rooms/${roomId}`);
}

function uploadTrimImage(payload: FormData): AsyncResponse<any> {
  return api.post("/trimmoldings/upload", payload);
}

function deleteOneTrim(id: string): AsyncResponse<any> {
  return api.delete(`/trimmoldings/${id}`);
}

function duplicateTrim(payload: { id: any }): AsyncResponse<Trim> {
  return api.post("/trimmoldings/duplicate", payload);
}

export {
  getTrims,
  getDefaultTrims,
  updateTrimMolding,
  getOneTrimMolding,
  createTrimMolding,
  getTrimMoldingClassifications,
  getTrimMoldingSublassifications,
  getRoomTrimsMolding,
  uploadTrimImage,
  deleteOneTrim,
  duplicateTrim,
};
