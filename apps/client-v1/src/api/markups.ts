import { Markup } from "type-defs";
import { api, apiV2, AsyncResponse, ResponseDataWithCount } from "./Api";

function createMarkup(payload: {
  is_default: boolean;
  status: any;
}): AsyncResponse<Markup> {
  return api.post("/markups", payload);
}

export async function getMarkup(id: string): AsyncResponse<Markup> {
  return apiV2.get(`/markups/${id}}`);
}

export type TGetDefaultMarkupsData = ResponseDataWithCount<Markup>;

function getDefaultMarkups(query = ""): AsyncResponse<TGetDefaultMarkupsData> {
  return api.get(`/defaultsetup/markups${query}`);
}

function getMarkupById(markupId: string): AsyncResponse<Markup> {
  return api.get(`/markups/${markupId}`);
}

function updateMarkup(
  id: string,
  payload: Partial<Markup>
): AsyncResponse<Markup> {
  return api.update(`/markups/${id}`, payload);
}

function deleteMarkup(id: string): AsyncResponse<any> {
  return api.delete(`/markups/${id}`);
}

function duplicateMarkup(payload: { id: any }): AsyncResponse<Markup> {
  return api.post("/markups/duplicate", payload);
}

export {
  createMarkup,
  getDefaultMarkups,
  getMarkupById,
  updateMarkup,
  deleteMarkup,
  duplicateMarkup,
};
