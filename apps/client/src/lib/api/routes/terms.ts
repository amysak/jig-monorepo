import { LocationGenerics } from "router";
import { ApiGetResult, Terms } from "type-defs";
import { client } from "../http";

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<ApiGetResult<Terms>> => {
  return client.get(`/terms?${client.getQueryString(query)}`);
};

export const getById = (termId: string | number): Promise<Terms> => {
  return client.get(`/terms/${termId}`);
};

export const create = (payload: Partial<Terms>): Promise<Terms> => {
  return client.post("/terms", payload);
};

export const updateById = (
  id: string,
  payload: Partial<Terms>
): Promise<Terms> => {
  return client.update(`/terms/${id}`, payload);
};

export type TGetDefaultTerms = { count: number; terms: Terms[] };

export const deleteById = (id: string | number): Promise<void> => {
  return client.delete(`/terms/${id}`);
};
