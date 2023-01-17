import { MaterialType } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

function updateMaterialType(
  id: string,
  payload: any
): AsyncResponse<MaterialType> {
  return api.update(`/materialtypes/${id}`, payload);
}

export type TGetMaterialTypesData = ResponseDataWithCount<MaterialType>;

function getMaterialTypes(query = ""): AsyncResponse<TGetMaterialTypesData> {
  return api.get(`/materialtypes${query}`);
}

function createMaterialType(payload: any): AsyncResponse<MaterialType> {
  return api.post("/materialtypes", payload);
}

function deleteMaterialType(typeId: string): AsyncResponse<any> {
  return api.delete(`/materialtypes/${typeId}`);
}

export {
  updateMaterialType,
  getMaterialTypes,
  createMaterialType,
  deleteMaterialType,
};
