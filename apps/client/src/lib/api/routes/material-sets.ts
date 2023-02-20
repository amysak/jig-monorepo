import { ApiGetResult, DeepPartial, MaterialSet } from "type-defs";
import { client } from "../http";

export const getById = (setId: number): Promise<MaterialSet> => {
  return client.get(`/material-sets/${setId}`);
};

export const create = (
  payload: DeepPartial<MaterialSet>
): Promise<MaterialSet> => {
  return client.post("/material-sets", payload);
};

export const assign = (
  originalSetId: number,
  newSetId: number
): Promise<MaterialSet> => {
  return client.put(`/material-sets/${originalSetId}`, { setId: newSetId });
};

export const getAll = (
  query?: Record<string, unknown>
): Promise<ApiGetResult<MaterialSet>> => {
  return client.get(`/material-sets?${client.getQueryString(query)}`);
};

export const updateById = (
  id: number,
  payload: Partial<MaterialSet>
): Promise<MaterialSet> => {
  return client.update(`/material-sets/${id}`, payload);
};

export const deleteById = (setId: string | number) => {
  return client.delete(`/material-sets/${setId}`);
};
