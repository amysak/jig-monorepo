import { Tax } from "entities";
import { api, AsyncResponse } from "./Api";

function createTax(payload: any): AsyncResponse<Tax> {
  return api.post("/taxes", payload);
}

function updateTax(taxId: string, payload: any): AsyncResponse<Tax> {
  return api.update(`/taxes/${taxId}`, payload);
}

function getTaxByEntity(entity: string, entityId: any): AsyncResponse<Tax> {
  return api.get(`/taxes/${entity}/${entityId}`);
}

export { createTax, getTaxByEntity, updateTax };
