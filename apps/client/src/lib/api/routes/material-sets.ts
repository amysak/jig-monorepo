import { LocationGenerics } from "router";
import { ApiGetResult, MaterialSet } from "type-defs";
import { client } from "../http";

// export const getById = (cabinetId: string): Promise<Cabinet> => {
//   return client.get(`/cabinets/${cabinetId}`);
// };

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<ApiGetResult<MaterialSet>> => {
  return client.get(`/material-sets?${client.getQueryString(query)}`);
};

export const deleteById = (toeId: string | number) => {
  return client.delete(`/material-sets/${toeId}`);
};
