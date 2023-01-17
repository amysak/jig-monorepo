import { Finishes } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetSetupFinishesData = ResponseDataWithCount<Finishes>;

function getSetupFinishes(query = ""): AsyncResponse<TGetSetupFinishesData> {
  return api.get(`/defaultsetup/finishes${query}`);
}

function createFinish(payload: any): AsyncResponse<Finishes[]> {
  return api.post("/finishes", payload);
}

function updateFinish(id: any, payload: { status: any }): AsyncResponse<any> {
  //@ts-ignore
  return api.update(`/finishes/${id}`, payload);
}

function getFinish(id: string): AsyncResponse<Finishes> {
  return api.get(`/finishes/${id}`);
}

export type TGetFinishesData = TGetSetupFinishesData;

function getFinishes(query = ""): AsyncResponse<TGetFinishesData> {
  return api.get(`/finishes${query}`);
}

function deleteFinish(id: string): AsyncResponse<any> {
  return api.delete(`/finishes/${id}`);
}

function duplicateFinish(payload: {
  id: string;
}): AsyncResponse<Partial<Finishes> & Finishes> {
  return api.post("/finishes/duplicate", payload);
}

export {
  getSetupFinishes,
  createFinish,
  updateFinish,
  getFinish,
  getFinishes,
  deleteFinish,
  duplicateFinish,
};
