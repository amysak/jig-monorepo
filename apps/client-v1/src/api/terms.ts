import { Terms } from "entities";
import { api, apiV2, AsyncResponse } from "./Api";

function createTerm(payload: {
  is_default: boolean;
  status: any;
}): AsyncResponse<Terms> {
  return api.post("/terms", payload);
}

function updateTerms(
  id: string,
  payload: Partial<Terms>
): AsyncResponse<Terms> {
  return apiV2.update(`/terms/${id}`, payload);
}

function getAllTerms(): AsyncResponse<Terms[]> {
  return apiV2.get("/terms");
}

export async function getTerm(id: string): Promise<Terms> {
  return apiV2.get(`/terms/${id}`);
}

export type TGetDefaultTerms = { count: number; terms: Terms[] };

function getDefaultTerms(query = ""): Promise<TGetDefaultTerms> {
  return api.get(`/defaultsetup/terms${query}`);
}

function getJustOneTerm(termId: string): AsyncResponse<Terms> {
  return api.get(`/terms/${termId}`);
}

function deleteTerm(id: string): AsyncResponse<any> {
  return api.delete(`/terms/${id}`);
}

function duplicateTerm(payload: {
  id: any;
}): AsyncResponse<Partial<Terms> & Terms> {
  return api.post("/terms/duplicate", payload);
}

export {
  createTerm,
  getDefaultTerms,
  getJustOneTerm,
  updateTerms,
  deleteTerm,
  duplicateTerm,
  getAllTerms,
};
