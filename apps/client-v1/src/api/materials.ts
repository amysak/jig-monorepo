import { Material } from "entities";
import { MaterialSetup } from "entities";

import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetDefaultMaterialsData = ResponseDataWithCount<Material>;

function getDefaultMaterials(
  query = ""
): AsyncResponse<TGetDefaultMaterialsData> {
  return api.get(`/defaultsetup/materials${query}`);
}

export type TGetSetupMaterialsData = ResponseDataWithCount<MaterialSetup>;

function getSetupMaterials(query = ""): AsyncResponse<TGetSetupMaterialsData> {
  return api.get(`/defaultsetup/setup-materials${query}`);
}

function createMaterialSetup(payload: any): AsyncResponse<MaterialSetup[]> {
  return api.post("/materialsetup", payload);
}

export type TGetSetupMaterialNamesData = TGetSetupMaterialsData;

function getSetupMaterialNames(
  query = ""
): AsyncResponse<TGetSetupMaterialNamesData> {
  return api.get(`/materialsetup/names${query}`);
}

function getOneMaterialSetup(id: string): AsyncResponse<MaterialSetup> {
  return api.get(`/materialsetup/${id}`);
}

function updateOneMaterialSetup(
  id: string,
  payload: {
    source: any;
    in_house_material_cost: number;
    waste_factor: number;
    out_material_cost_per_sq_feet: number;
    supplier_discount: number;
    purpose: any;
  } & { in_discounted_cost: any; out_discounted_cost: any }
): AsyncResponse<MaterialSetup> {
  return api.update(`/materialsetup/${id}`, payload);
}

function getOneMaterial(materialId: string): AsyncResponse<Material> {
  return api.get(`/materials/${materialId}`);
}

function updateMaterial(
  materialId: string,
  payload: any
): AsyncResponse<MaterialSetup> {
  return api.update(`/materials/${materialId}`, payload);
}

export type TGetDefaultMaterialsNamesData = TGetDefaultMaterialsData;

function getDefaultMaterialsNames(): AsyncResponse<TGetDefaultMaterialsNamesData> {
  return api.get("/materials/names");
}

function getRoomMaterial(roomId: string): AsyncResponse<Material> {
  return api.get(`/materials/rooms/${roomId}`);
}

function createRoomMaterial(
  roomId: string,
  payload: any
): AsyncResponse<Material> {
  return api.post(`/materials/rooms/${roomId}/materials`, payload);
}

function updateRoomMaterial(roomId: string, payload: any): AsyncResponse<any> {
  return api.update(`/materials/rooms/${roomId}/materials`, payload);
}

function createMaterial(payload: {
  is_default: boolean;
  status: any;
}): AsyncResponse<Material> {
  return api.post("/materials", payload);
}

export type TGetAllMaterialsByMaterialTypeData = TGetSetupMaterialsData;

function getAllMaterialsByMaterialType(
  materialTypeId: string
): AsyncResponse<TGetAllMaterialsByMaterialTypeData> {
  return api.get(`/materialsetup/material-type/${materialTypeId}`);
}

function deleteOneMaterialSetup(id: string): AsyncResponse<any> {
  return api.delete(`/materialsetup/${id}`);
}

function duplicateOneMaterialSetup(payload: {
  id: any;
}): AsyncResponse<Partial<MaterialSetup> & MaterialSetup> {
  return api.post("/materialsetup/duplicate", payload);
}

function deleteDefaultMaterial(id: string): AsyncResponse<any> {
  return api.delete(`/materials/${id}`);
}

function duplicateDefaultMaterial(payload: {
  id: string;
}): AsyncResponse<Partial<Material> & Material> {
  return api.post("/materials/duplicate", payload);
}

function bulkUpdateDefaultMaterial(
  id: string,
  payload: any
): AsyncResponse<Material> {
  return api.update(`/materials/${id}/bulk`, payload);
}

export {
  getDefaultMaterials,
  getSetupMaterials,
  getOneMaterial,
  updateMaterial,
  getDefaultMaterialsNames,
  getSetupMaterialNames,
  getRoomMaterial,
  createRoomMaterial,
  updateRoomMaterial,
  createMaterial,
  createMaterialSetup,
  getOneMaterialSetup,
  updateOneMaterialSetup,
  getAllMaterialsByMaterialType,
  deleteOneMaterialSetup,
  duplicateOneMaterialSetup,
  deleteDefaultMaterial,
  duplicateDefaultMaterial,
  bulkUpdateDefaultMaterial,
};
