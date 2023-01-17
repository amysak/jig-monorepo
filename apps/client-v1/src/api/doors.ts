import { Door } from "entities";
import { MaterialSetup } from "entities";
import { Profile } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetDoorProfilesData = ResponseDataWithCount<Profile>;

function getDoorProfiles(query = ""): AsyncResponse<TGetDoorProfilesData> {
  return api.get(`/defaultsetup/door-profiles${query}`);
}

function createDoorDrawer(payload: any): AsyncResponse<Door> {
  return api.post("/doors", payload);
}

export type TGetDoorsDrawersData = ResponseDataWithCount<Door>;

function getDoorsDrawers(query = ""): AsyncResponse<TGetDoorsDrawersData> {
  return api.get(`/doors${query}`);
}

function getOneDoorDrawer(doorId: string): AsyncResponse<Door> {
  return api.get(`/doors/${doorId}`);
}

function updateOne(
  doorId: string,
  payload: { [x: number]: any }
): AsyncResponse<Door> {
  //@ts-ignore
  return api.update(`/doors/${doorId}`, payload);
}

function getDoorMaterialTypes(): AsyncResponse<any> {
  return api.get("/doors/materials");
}

function addMaterialToDoor(
  doorId: string,
  payload: any
): AsyncResponse<
  | MaterialSetup
  | {
      done: boolean;
      message: string;
    }
> {
  return api.post(`/doors/${doorId}/materials`, payload);
}

function removeMaterialFromDoor(
  doorId: string,
  materialId: string
): AsyncResponse<Door> {
  return api.delete(`/doors/${doorId}/materials/${materialId}`);
}

function getAllDoorMaterials(doorId: string): AsyncResponse<Door[]> {
  return api.get(`/doors/${doorId}/materials`);
}

export type TGetAllDoorsByMaterialTypeData = ResponseDataWithCount<Door>;

function getAllDoorsByMaterialType(
  materialId: string
): AsyncResponse<TGetAllDoorsByMaterialTypeData> {
  return api.get(`/doors/materials/types/${materialId}`);
}

function uploadDoorImage(payload: FormData): AsyncResponse<any> {
  return api.post("/doors/upload", payload);
}

function deleteOneDoorDrawer(id: string): AsyncResponse<any> {
  return api.delete(`/doors/${id}`);
}

function duplicateDoorDrawer(payload: { id: string }): AsyncResponse<Door> {
  return api.post("/doors/duplicate", payload);
}

export {
  getDoorProfiles,
  createDoorDrawer,
  getDoorsDrawers,
  getOneDoorDrawer,
  updateOne,
  getDoorMaterialTypes,
  addMaterialToDoor,
  removeMaterialFromDoor,
  getAllDoorMaterials,
  getAllDoorsByMaterialType,
  uploadDoorImage,
  deleteOneDoorDrawer,
  duplicateDoorDrawer,
};
